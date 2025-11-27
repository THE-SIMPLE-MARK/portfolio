"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useTRPC } from "~/lib/api/trpc/react"

export function LatestPost() {
	const api = useTRPC()
	const queryClient = useQueryClient()
	const { data: latestPost } = useQuery(api.post.getLatest.queryOptions())

	const [name, setName] = useState("")
	const createPost = useMutation(
		api.post.create.mutationOptions({
			onSuccess: () => {
				void queryClient.invalidateQueries(api.post.getLatest.queryFilter())
			},
		}),
	)

	return (
		<div className="w-full max-w-xs">
			{latestPost ? (
				<p className="truncate">Your most recent post: {latestPost.name}</p>
			) : (
				<p>You have no posts yet.</p>
			)}
			<form
				onSubmit={e => {
					e.preventDefault()
					createPost.mutate({ name })
				}}
				className="flex flex-col gap-2"
			>
				<input
					type="text"
					placeholder="Title"
					value={name}
					onChange={e => setName(e.target.value)}
					className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
				/>
				<button
					type="submit"
					className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
					disabled={createPost.isPending}
				>
					{createPost.isPending ? "Submitting..." : "Submit"}
				</button>
			</form>
		</div>
	)
}
