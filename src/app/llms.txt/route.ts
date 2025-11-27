import { source } from "~/lib/mdx/source"

export const dynamic = "force-static"

export async function GET() {
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
}
