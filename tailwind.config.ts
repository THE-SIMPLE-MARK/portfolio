import type { Config } from "tailwindcss"

const config = {
	darkMode: false,
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
		},
	},
} satisfies Config

export default config
