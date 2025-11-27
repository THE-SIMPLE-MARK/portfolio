import "server-only"

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"
import { cache } from "react"
import { createTRPCContext } from "~/lib/api/trpc"
import { appRouter } from "~/lib/api/trpc/root"
import { createQueryClient } from "./utils/queryClientFactory"

// ! create a stable getter for the query client that will return the same client during the same request.
export const getQueryClient = cache(createQueryClient)

/**
 * Only use if you really need to use the data both on the server as well as inside client components and understand the tradeoffs explained in the
 * 	[Advanced Server Rendering guide](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#data-ownership-and-revalidation).
 *
 * You can use `fetchQuery` instead of `prefetch` to have the data both on the server as well as hydrating it down to the client.
 */
export const api = createTRPCOptionsProxy({
	ctx: createTRPCContext,
	router: appRouter,
	queryClient: getQueryClient,
})

/**
 * Use this in most cases. This method is detached from your query client and does not store the data in the cache.
 * This means that you cannot use the data in a server component and expect it to be available in the client.
 *
 * This is intentional and explained in more detail in the
 * [Advanced Server Rendering guide](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#data-ownership-and-revalidation).
 */
export const caller = appRouter.createCaller(createTRPCContext)
