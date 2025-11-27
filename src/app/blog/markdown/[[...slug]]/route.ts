import { notFound } from "next/navigation"
import { getLLMText } from "~/lib/mdx/getLLMText"
import { source } from "~/lib/mdx/source"

type RouteParams = { params: Promise<{ slug?: string[] }> }

export async function generateStaticParams() {
	return source.generateParams()
}

export async function GET(_: Request, { params }: RouteParams) {
	const { slug } = await params

	const page = source.getPage(slug)
	if (!page) notFound()

	const content = await getLLMText(page)
	return new Response(content, {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	})
}
