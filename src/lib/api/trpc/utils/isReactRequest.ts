import { headers } from "next/headers"

/**
 * Checks if the tRPC request is coming from the client-side Tanstack Query (React) client.
 * ! this only works for tRPC requests!
 */
export async function getIsReactRequest(): Promise<boolean> {
	const headerStore = await headers()
	const sourceHeader = headerStore.get("x-trpc-source")

	if (!sourceHeader) return false

	return sourceHeader === "nextjs-react"
}
