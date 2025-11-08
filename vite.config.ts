import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import mdx from "fumadocs-mdx/vite";
import { nitro } from "nitro/vite";
import { glob } from "tinyglobby";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const docsPaths = await getContentPaths();
const docsPathsWithIndex = await getContentPaths(true);

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		tanstackStart({
			prerender: {
				enabled: true,
				crawlLinks: true,
				failOnError: true,
			},
			pages: [
				{
					path: "/llms.txt",
					prerender: { enabled: true },
				},
				...docsPaths.map((path) => ({
					path,
					prerender: { enabled: true },
				})),
				...docsPathsWithIndex.map((path) => ({
					path: `${path}.mdx`,
					prerender: { enabled: true },
				})),
			],
		}),
		mdx(await import("./source.config")),
		react(),
		tailwindcss(),
		tsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		nitro(),
	],
});

/**
 * Get the paths of the content file (md,mdx) without using the generated ~/.source stuff.
 * @param keepIndex - whether to keep the index file
 * @returns the URL paths of the docs files
 */
export async function getContentPaths(keepIndex: boolean = false) {
	const files = await glob("content/docs/**/*.{md,mdx}");

	return files.map((file) => {
		const relativePath = path.relative("content/docs", file);
		const slugs = relativePath
			.replace(/\.(md|mdx)$/, "")
			.split(path.sep)
			.filter(Boolean)
			.filter((slug) => (keepIndex ? true : slug !== "index"));

		if (slugs.length === 0) return "/blog";
		return `/blog/${slugs.join("/")}`;
	});
}
