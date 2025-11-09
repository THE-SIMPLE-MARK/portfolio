import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import { Image } from "@unpic/react";
import { ipAddress } from "@vercel/functions";
import { getGithubLastEdit } from "fumadocs-core/content/github";
import type * as PageTree from "fumadocs-core/page-tree";
import { createClientLoader } from "fumadocs-mdx/runtime/vite";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/page";
import { useMemo } from "react";
import { z } from "zod";
import { blog } from "~/.source";
import { Feedback } from "~/components/feedback";
import { LLMCopyButton, ViewOptions } from "~/components/pageActions";
import { getLLMText } from "~/lib/getLLMText";
import { getMDXComponents } from "~/lib/mdxComponents";
import { ratelimit } from "~/lib/ratelimit";
import { source } from "~/lib/source";

export const Route = createFileRoute("/blog/$")({
	server: {
		handlers: {
			// this handles *.md requests
			GET: async ({ params, next }) => {
				const splat = params._splat ?? "";

				// skip if not *.md
				if (!splat.endsWith(".md")) return next();

				const pathWithoutExt = splat.slice(0, -3);
				const isRootPage = pathWithoutExt === "" || pathWithoutExt === "index";
				const slugs = isRootPage
					? []
					: pathWithoutExt.split("/").filter(Boolean);

				const page = source.getPage(slugs);
				if (!page) throw notFound();

				const content = await getLLMText(page);
				return new Response(content, {
					headers: {
						"Content-Type": "text/markdown; charset=utf-8",
					},
				});
			},
		},
	},
	component: Page,
	loader: async ({ params }) => {
		const slugs = params._splat?.split("/") ?? [];
		const data = await loader({ data: slugs });
		await clientLoader.preload(data.path);

		return {
			...data,
			mdPath: `${slugs.length > 0 && slugs[0] !== "" ? slugs.join("/") : "index"}.md`,
		};
	},
});

const loader = createServerFn({
	method: "GET",
})
	.middleware([staticFunctionMiddleware])
	.inputValidator((slugs: string[]) => slugs)
	.handler(async ({ data: slugs }) => {
		const page = source.getPage(slugs);
		if (!page) throw notFound();

		const lastModified =
			process.env.NODE_ENV === "production"
				? await getGithubLastEdit({
						owner: "THE-SIMPLE-MARK",
						repo: "portfolio",
						path: `content/blog/${page.path}`,
						token: process.env.GITHUB_TOKEN,
					})
				: undefined;

		return {
			tree: source.pageTree as object,
			path: page.path,
			lastModified,
		};
	});

const ratingAction = createServerFn({
	method: "POST",
})
	.inputValidator(
		z.object({
			path: z.string(),
			opinion: z.enum(["good", "bad"]),
			message: z.string().max(1000),
		}),
	)
	.handler(async ({ data: { path, opinion, message } }) => {
		const request = getRequest();
		const ip = ipAddress(request);
		if (!ip && process.env.NODE_ENV === "production")
			throw new Error("IP_ERROR");

		const { success } = await ratelimit.limit(ip ?? "127.0.0.1");
		if (!success) throw new Error("RATE_LIMITED");

		const content = `🎉 New feedback received!

**Page**: ${path}
**Rating**: ${opinion === "good" ? "👍" : "👎"}
**Message**: ${message}`;

		if (!process.env.DISCORD_WEBHOOK_URL) throw new Error("CONFIG_ERROR");

		const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				content,
			}),
		});
		console.log(response);

		if (response.status === 429) throw new Error("RATE_LIMITED");

		if (!response.ok) throw new Error("API_ERROR");
	});

const clientLoader = createClientLoader(blog.doc, {
	id: "blog",
	component({ toc, frontmatter, default: MDX }) {
		const data = Route.useLoaderData();

		return (
			<DocsPage
				toc={toc}
				tableOfContent={{ style: "clerk" }}
				lastUpdate={data.lastModified ? new Date(data.lastModified) : undefined}
			>
				<DocsTitle>{frontmatter.title}</DocsTitle>
				<DocsDescription className="mb-0">
					{frontmatter.description}
				</DocsDescription>

				<div
					id="page-actions"
					className="flex flex-row gap-2 items-center border-b pb-6"
				>
					<LLMCopyButton markdownUrl={`/blog/${data.mdPath}`} />
					<ViewOptions
						markdownUrl={`/blog/${data.mdPath}`}
						githubUrl={`https://github.com/THE-SIMPLE-MARK/portfolio/blob/main/content/docs/${data.mdPath}`}
					/>
				</div>

				<DocsBody>
					<MDX components={getMDXComponents()} />
				</DocsBody>

				<Feedback
					onRateAction={async ({ path, opinion, message }) => {
						await ratingAction({ data: { path, opinion, message } });
					}}
				/>
			</DocsPage>
		);
	},
});

function Page() {
	const data = Route.useLoaderData();
	const Content = clientLoader.getComponent(data.path);
	const tree = useMemo(
		() => transformPageTree(data.tree as PageTree.Folder),
		[data.tree],
	);

	return (
		<DocsLayout
			nav={{
				title: (
					<div className="flex flex-row items-center gap-2">
						<Image src="/logo.svg" alt="Logo" width={24} height={24} />
						<span className="font-heading">Blog n' Stuff</span>
					</div>
				),
			}}
			tree={tree}
			themeSwitch={{ mode: "light-dark-system" }}
		>
			<Content />
		</DocsLayout>
	);
}

function transformPageTree(root: PageTree.Root): PageTree.Root {
	function mapNode<T extends PageTree.Node>(item: T): T {
		if (typeof item.icon === "string")
			item = {
				...item,
				icon: (
					<span
						// biome-ignore lint/security/noDangerouslySetInnerHtml: this is a valid use case for dangerouslySetInnerHTML
						dangerouslySetInnerHTML={{
							__html: item.icon,
						}}
					/>
				),
			};

		if (item.type === "folder")
			return {
				...item,
				index: item.index ? mapNode(item.index) : undefined,
				children: item.children.map(mapNode),
			};
		else return item;
	}

	return {
		...root,
		children: root.children.map(mapNode),
		fallback: root.fallback ? transformPageTree(root.fallback) : undefined,
	};
}
