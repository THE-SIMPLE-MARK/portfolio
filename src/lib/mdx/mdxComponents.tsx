import { ImageZoom } from "fumadocs-ui/components/image-zoom"
import defaultComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultComponents,
		img: props => <ImageZoom {...props} />,
		input: props => {
			// make checkboxes clickable (useful for the reader to tick off steps)
			if (props.type === "checkbox")
				return <input {...props} disabled={false} />

			return <input {...props} />
		},
		...components,
	}
}
