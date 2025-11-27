import { t } from "~/lib/api/trpc"

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
	const start = Date.now()

	if (t._config.isDev) {
		// artificial delay in dev
		const waitMs = Math.floor(Math.random() * 400) + 100
		await new Promise(resolve => setTimeout(resolve, waitMs))
	}

	const result = await next()

	const end = Date.now()
	console.log(`[TRPC] ${path} took ${end - start}ms to execute`)

	return result
})

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new procedures. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure.use(timingMiddleware)
