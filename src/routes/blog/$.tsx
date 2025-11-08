import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
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
import { docs } from "~/.source";
import { LLMCopyButton, ViewOptions } from "~/components/page-actions";
import { getMDXComponents } from "~/lib/mdx-components";
import { source } from "~/lib/source";

export const Route = createFileRoute("/blog/$")({
	component: Page,
	loader: async ({ params }) => {
		const slugs = params._splat?.split("/") ?? [];
		const data = await loader({ data: slugs });
		await clientLoader.preload(data.path);

		return {
			...data,
			mdxPath: `${slugs.length > 0 && slugs[0] !== "" ? slugs.join("/") : "index"}.mdx`,
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

		return {
			tree: source.pageTree as object,
			path: page.path,
		};
	});

const clientLoader = createClientLoader(docs.doc, {
	id: "blog",
	component({ toc, frontmatter, default: MDX }) {
		const data = Route.useLoaderData();

		return (
			<DocsPage
				toc={toc}
				tableOfContent={{ style: "clerk" }}
				footer={{ enabled: false }}
			>
				<DocsTitle>{frontmatter.title}</DocsTitle>
				<DocsDescription className="mb-0">
					{frontmatter.description}
				</DocsDescription>

				<div className="flex flex-row gap-2 items-center border-b pb-6">
					<LLMCopyButton markdownUrl={`/blog/${data.mdxPath}`} />
					<ViewOptions
						markdownUrl={`/blog/${data.mdxPath}`}
						githubUrl={`https://github.com/THE-SIMPLE-MARK/portfolio/blob/main/content/docs/${data.mdxPath}`}
					/>
				</div>

				<DocsBody>
					<MDX components={getMDXComponents()} />
				</DocsBody>
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
			nav={{ title: "Blog n' Stuff" }}
			tree={tree}
			themeSwitch={{ mode: "light-dark-system" }}
		>
			<Content />
		</DocsLayout>
	);
}

function transformPageTree(root: PageTree.Root): PageTree.Root {
	function mapNode<T extends PageTree.Node>(item: T): T {
		if (typeof item.icon === "string") {
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
		}

		if (item.type === "folder") {
			return {
				...item,
				index: item.index ? mapNode(item.index) : undefined,
				children: item.children.map(mapNode),
			};
		}

		return item;
	}

	return {
		...root,
		children: root.children.map(mapNode),
		fallback: root.fallback ? transformPageTree(root.fallback) : undefined,
	};
}
