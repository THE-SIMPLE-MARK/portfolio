const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://bmarkk.tech"
		: "http://localhost:3000"

export interface MetadataOptions {
	title: string
	description?: string
	url?: string
	titleSuffix?: string
}

export function createMetadata({
	title,
	titleSuffix = "Márk's Portfolio",
	description = "Márk Böszörményi's portfolio website. (I know my last name is long and unreadable)",
	url,
}: MetadataOptions) {
	const fullUrl = url ? `${baseUrl}${url}` : baseUrl
	const fullTitle = `${title} | ${titleSuffix}`

	return {
		meta: [
			{
				title: fullTitle,
			},
			...(description
				? [
						{
							name: "description",
							content: description,
						},
					]
				: []),
			// Open Graph
			{
				property: "og:title",
				content: fullTitle,
			},
			...(description
				? [
						{
							property: "og:description",
							content: description,
						},
					]
				: []),
			{
				property: "og:url",
				content: fullUrl,
			},
			{
				property: "og:type",
				content: "website",
			},
			// Twitter Card
			{
				name: "twitter:card",
				content: "summary",
			},
			{
				name: "twitter:title",
				content: fullTitle,
			},
			...(description
				? [
						{
							name: "twitter:description",
							content: description,
						},
					]
				: []),
		],
	}
}
