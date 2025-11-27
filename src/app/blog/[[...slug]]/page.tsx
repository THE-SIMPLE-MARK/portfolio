import { createRelativeLink } from "fumadocs-ui/mdx"
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/page"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getMDXComponents } from "~/lib/mdx/mdxComponents"
import { source } from "~/lib/mdx/source"

interface PageProps {
	params: Promise<{ slug: string[] }>
}

export default async function Page({ params }: PageProps) {
	const { slug } = await params
	const page = source.getPage(slug)
	if (!page) notFound()

	const MDX = page.data.body

	return (
		<DocsPage toc={page.data.toc} full={page.data.full}>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>

			<DocsBody>
				<MDX
					components={getMDXComponents({
						// this allows you to link to other pages with relative file paths
						a: createRelativeLink(source, page),
					})}
				/>
			</DocsBody>
		</DocsPage>
	)
}

export async function generateStaticParams() {
	return source.generateParams()
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params
	const page = source.getPage(slug)

	if (!page) notFound()

	return {
		title: page.data.title,
		description: page.data.description,
	}
}
