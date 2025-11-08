export default defineNitroConfig({
	compatibilityDate: "latest",
	publicAssets: [
		// TODO: this is a temporary fix to https://github.com/TanStack/router/issues/5368
		{
			baseURL: "/__tsr",
			dir: "dist/client/__tsr",
		},
	],
});
