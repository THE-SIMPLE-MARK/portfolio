import { createFileRoute, notFound } from "@tanstack/react-router";
import { getLLMText } from "~/lib/getLLMText";
import { source } from "~/lib/source";

export const Route = createFileRoute("/blog/$mdx")({
	server: {
		handlers: {
			GET: async ({ params }) => {
				const mdxPath = params.mdx;
				if (!mdxPath || !mdxPath.endsWith(".mdx")) throw notFound();

				const pathWithoutExt = mdxPath.slice(0, -4); // Remove .mdx
				const slugs =
					pathWithoutExt === "" || pathWithoutExt === "index"
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
});
