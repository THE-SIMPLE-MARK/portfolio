import type { MetadataRoute } from "next"
import env from "~/env"
import { source } from "~/lib/mdx/source"

const baseUrl =
	env.NODE_ENV === "production"
		? "https://bmarkk.tech"
		: "https://localhost:3000"

type SitemapPage = MetadataRoute.Sitemap[number]
export default function sitemap(): MetadataRoute.Sitemap {
	const regularPages = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 1,
		},
	]

	const blogPages = source.getPages().map(
		page =>
			({
				url: baseUrl + page.url,
				lastModified: new Date(),
				changeFrequency: "weekly" as const,
				priority: 0.5,
			}) satisfies SitemapPage as SitemapPage,
	)

	return [...regularPages, ...blogPages]
}
