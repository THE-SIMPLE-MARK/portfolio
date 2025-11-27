import type { InferPageType } from "fumadocs-core/source"
import type { source } from "~/lib/mdx/source"

export async function getLLMText(page: InferPageType<typeof source>) {
	const processed = await page.data.getText("processed")

	const header = `# ${page.data.title} (${page.url})`
	return header + processed
}
