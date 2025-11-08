import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import mdx from "fumadocs-mdx/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		react(),
		tailwindcss(),
		mdx(await import("./source.config")),
		tsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tanstackStart({
			prerender: {
				enabled: true,
			},
		}),
		nitro(),
		mkcert(),
	],
});
