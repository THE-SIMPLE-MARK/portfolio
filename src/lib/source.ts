import { loader } from "fumadocs-core/source";
import * as icons from "lucide-static";
import { blog, create } from "~/.source";

export const source = loader({
	source: await create.sourceAsync(blog.doc, blog.meta),
	baseUrl: "/blog",
	icon(icon) {
		if (!icon) {
			return;
		}

		// biome-ignore lint/performance/noDynamicNamespaceImportAccess: idk it just works
		if (icon in icons) return icons[icon as keyof typeof icons];
	},
});
