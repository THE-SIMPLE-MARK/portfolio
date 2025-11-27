import "server-only"

import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import type { TRPCQueryOptions } from "@trpc/tanstack-react-query"
import { getQueryClient } from "~/lib/api/trpc/server"

/**
 * Prefetch a query in an RSC.
 *
 * This is a wrapper around the `prefetchQuery` and `prefetchInfiniteQuery` methods of the `QueryClient`.
 *
 * @important `void` the promise to have the result stream to the client as it becomes available, this results in an initial undefined state,
 * `await` the promise to wait for the result to be fully fetched before continuing with the flow of the RSC.
 *
 * @see https://trpc.io/docs/client/tanstack-react-query/server-components#using-your-api
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/prefetching
 *
 * @param queryOptions
 */
// this is how it is in the tRPC docs
// biome-ignore lint/suspicious/noExplicitAny: this is how it is in the tRPC docs
export async function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
	queryOptions: T,
) {
	const queryClient = getQueryClient()
	if (queryOptions.queryKey?.[1]?.type === "infinite") {
		// @ts-expect-error - this is how it is in the tRPC docs
		await queryClient.prefetchInfiniteQuery(queryOptions)
	} else {
		await queryClient.prefetchQuery(queryOptions)
	}
}

export function HydrateClient(props: { children: React.ReactNode }) {
	const queryClient = getQueryClient()
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			{props.children}
		</HydrationBoundary>
	)
}
