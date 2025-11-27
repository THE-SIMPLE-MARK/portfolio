import { createRelativeLink } from "fumadocs-ui/mdx"
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/page"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LLMCopyButton, ViewOptions } from "~/components/pageActions"
import { getMDXComponents } from "~/lib/mdx/mdxComponents"
import { source } from "~/lib/mdx/source"

interface PageProps {
	params: Promise<{ slug?: string[] }>
}

export default async function Page({ params }: PageProps) {
	const { slug } = await params
	const page = source.getPage(slug)
	if (!page) notFound()

	const MDX = page.data.body
	const markdownPath = slug ? slug.join("/") : "index"
	const githubUrl = `https://github.com/THE-SIMPLE-MARK/portfolio/blob/main/content/blog/${markdownPath}.mdx`

	return (
		<DocsPage toc={page.data.toc} full={page.data.full}>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription className="mb-0">
				{page.data.description}
			</DocsDescription>

			<div
				id="page-actions"
				className="flex flex-row gap-2 items-center border-b pb-6"
			>
				<LLMCopyButton markdownUrl={`/blog/markdown/${markdownPath}`} />
				<ViewOptions
					markdownUrl={`/blog/markdown/${markdownPath}`}
					githubUrl={githubUrl}
				/>
			</div>

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
