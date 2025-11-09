import { createFileRoute } from "@tanstack/react-router"
import { source } from "~/lib/source"

export const Route = createFileRoute("/llms.txt")({
	server: {
		handlers: {
			GET: async () => {
				const lines: string[] = []

				lines.push("# Márk Böszörményi's Portfolio")
				lines.push("")
				lines.push("## Blog")

				const pages = source.getPages()
				for (const page of pages) {
					const url = `${page.url}.md`
					lines.push(`- [${page.data.title}](${url})`)
				}

				const content = lines.join("\n")

				return new Response(content, {
					headers: {
						"Content-Type": "text/plain; charset=utf-8",
					},
				})
			},
		},
	},
})
