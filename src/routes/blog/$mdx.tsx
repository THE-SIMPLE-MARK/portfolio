import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import { getLLMText } from "~/lib/getLLMText";
import { source } from "~/lib/source";

const getBlogContent = createServerFn({ method: "GET" })
	.middleware([staticFunctionMiddleware])
	.inputValidator((mdxPath: string) => mdxPath)
	.handler(async ({ data: mdxPath }) => {
		if (!mdxPath || !mdxPath.endsWith(".mdx")) throw notFound();

		const pathWithoutExt = mdxPath.slice(0, -4); // Remove .mdx
		const slugs =
			pathWithoutExt === "" || pathWithoutExt === "index"
				? []
				: pathWithoutExt.split("/").filter(Boolean);

		const page = source.getPage(slugs);
		if (!page) throw notFound();

		return await getLLMText(page);
	});

export const Route = createFileRoute("/blog/$mdx")({
	server: {
		handlers: {
			GET: async ({ params }) => {
				const content = await getBlogContent({ data: params.mdx });

				return new Response(content, {
					headers: {
						"Content-Type": "text/markdown; charset=utf-8",
					},
				});
			},
		},
	},
});
