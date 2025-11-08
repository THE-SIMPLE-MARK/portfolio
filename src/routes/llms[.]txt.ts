import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import { source } from "~/lib/source";

const generateLlmsFile = createServerFn({ method: "GET" })
	.middleware([staticFunctionMiddleware])
	.handler(async () => {
		const lines: string[] = [];

		lines.push("# Márk Böszörményi's Portfolio");
		lines.push("");
		lines.push("## Blog");

		const pages = source.getPages();
		for (const page of pages) {
			const url = `${page.url}.mdx`;
			lines.push(`- [${page.data.title}](${url})`);
		}

		return lines.join("\n");
	});

export const Route = createFileRoute("/llms.txt")({
	server: {
		handlers: {
			GET: async () => {
				const content = await generateLlmsFile();

				return new Response(content, {
					headers: {
						"Content-Type": "text/plain; charset=utf-8",
					},
				});
			},
		},
	},
});
