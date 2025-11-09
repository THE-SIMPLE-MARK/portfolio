export default defineNitroConfig({
	compatibilityDate: "latest",
	publicAssets: [
		// this is a temporary fix to https://github.com/TanStack/router/issues/5368
		{
			dir: "dist/client/__tsr",
			baseURL: "/__tsr",
		},
	],
	routeRules: {
		"/a/**": {
			proxy: { to: "https://va.vercel-scripts.com/v1/**" },
		},
		"/si/**": {
			proxy: {
				to: "https://va.vercel-scripts.com/v1/speed-insights/**",
			},
		},
	},
})
