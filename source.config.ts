import { defineConfig, defineDocs } from "fumadocs-mdx/config"

export const blog = defineDocs({
	dir: "content/blog",
	docs: {
		postprocess: {
			includeProcessedMarkdown: true,
		},
	},
})

export default defineConfig({
	mdxOptions: {
		rehypeCodeOptions: {
			inline: "tailing-curly-colon",
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
		},
	},
})
