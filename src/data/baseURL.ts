import env from "~/env"

export function getBaseURL() {
	const isHostedOnVercel = Boolean(env.VERCEL_URL)
	const isProd = env.NODE_ENV === "production"
	const isClient = typeof window !== "undefined"

	if (isClient) return window.location.origin

	if (isProd && !isHostedOnVercel)
		throw new Error(
			"Hosting on non-vercel infra is not supported due to vercel-specific env variables being used.",
		)

	if (isHostedOnVercel) return `https://${env.VERCEL_URL}`
	else return "https://localhost:3000"
}
