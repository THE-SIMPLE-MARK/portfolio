import { defineConfig, defineDocs } from "fumadocs-mdx/config"

export const blog = defineDocs({
	dir: "content/blog",
	docs: {
		postprocess: {
			includeProcessedMarkdown: true,
		},
	},
})

export default defineConfig()
