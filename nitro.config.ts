export default defineNitroConfig({
	compatibilityDate: "latest",
	publicAssets: [
		// this is a temporary fix to https://github.com/TanStack/router/issues/5368
		{
			dir: "dist/client/__tsr",
			baseURL: "/__tsr",
		},
	],
});
