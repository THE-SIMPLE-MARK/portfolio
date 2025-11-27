"use client"
import { getRouteApi } from "@tanstack/react-router"
import { cva } from "class-variance-authority"
import {
	Collapsible,
	CollapsibleContent,
} from "fumadocs-ui/components/ui/collapsible"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { type SyntheticEvent, useEffect, useState, useTransition } from "react"
import { cn } from "~/lib/cn"
import { buttonVariants } from "./ui/button"

const route = getRouteApi("/blog/$")

const rateButtonVariants = cva(
	"inline-flex items-center gap-2 px-3 py-2 rounded-full font-medium border text-sm [&_svg]:size-4 disabled:cursor-not-allowed",
	{
		variants: {
			active: {
				true: "bg-fd-accent text-fd-accent-foreground [&_svg]:fill-current",
				false: "text-fd-muted-foreground",
			},
		},
	},
)

export interface Feedback {
	opinion: "good" | "bad"
	path: string
	message: string
}

export function Feedback({
	onRateAction,
}: {
	onRateAction: (feedback: Feedback) => Promise<void>
}) {
	const splat = route.useParams()._splat
	const path = splat && splat !== "" ? splat : "index"
	const [previous, setPrevious] = useState<Feedback | null>(null)
	const [opinion, setOpinion] = useState<"good" | "bad" | null>(null)
	const [message, setMessage] = useState("")
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const item = localStorage.getItem(`docs-feedback-${path}`)

		if (item === null) return
		setPrevious(JSON.parse(item) as Feedback)
	}, [path])

	useEffect(() => {
		const key = `docs-feedback-${path}`

		if (previous) localStorage.setItem(key, JSON.stringify(previous))
		else localStorage.removeItem(key)
	}, [previous, path])

	async function submit(e?: SyntheticEvent) {
		if (opinion == null) return

		setError(null)
		startTransition(async () => {
			try {
				const feedback: Feedback = {
					path,
					opinion,
					message,
				}

				await onRateAction(feedback)
				setPrevious(feedback)
				setMessage("")
				setOpinion(null)
			} catch (err) {
				setError(
					`Failed to submit feedback: ${err instanceof Error ? err.message : "Unknown error"}`,
				)
				console.error(err)
			}
		})

		e?.preventDefault()
	}

	const activeOpinion = previous?.opinion ?? opinion

	return (
		<Collapsible
			open={opinion !== null || previous !== null}
			onOpenChange={(v) => {
				if (!v) setOpinion(null)
			}}
			id="feedback"
			className="border-y py-3"
		>
			<div className="flex flex-row items-center gap-2">
				<p className="text-sm font-medium pe-2">How is this blog?</p>
				<button
					type="button"
					disabled={previous !== null}
					className={cn(
						rateButtonVariants({
							active: activeOpinion === "good",
						}),
					)}
					onClick={() => {
						setOpinion("good")
					}}
				>
					<ThumbsUp />
					Good
				</button>
				<button
					type="button"
					disabled={previous !== null}
					className={cn(
						rateButtonVariants({
							active: activeOpinion === "bad",
						}),
					)}
					onClick={() => {
						setOpinion("bad")
					}}
				>
					<ThumbsDown />
					Bad
				</button>
			</div>

			<CollapsibleContent className="mt-3">
				{previous ? (
					<div className="px-3 py-6 flex flex-col items-center gap-3 bg-fd-card text-fd-muted-foreground text-sm text-center rounded-xl">
						<p>Thank you for your feedback! {":)"}</p>
						<div className="flex flex-row items-center gap-2">
							<button
								type="button"
								className={cn(
									buttonVariants({
										color: "secondary",
									}),
									"text-xs",
								)}
								onClick={() => {
									setOpinion(previous.opinion)
									setPrevious(null)
								}}
							>
								Submit Again
							</button>
						</div>
					</div>
				) : (
					<form className="flex flex-col gap-3" onSubmit={submit}>
						{error && <p className="text-red-500 text-sm">{error}</p>}
						<textarea
							// biome-ignore lint/a11y/noAutofocus: autofocus is needed
							autoFocus
							required
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className="border rounded-lg bg-fd-secondary text-fd-secondary-foreground p-3 resize-y focus-visible:outline-none placeholder:text-fd-muted-foreground"
							placeholder="Leave your feedback..."
							onKeyDown={(e) => {
								if (!e.shiftKey && e.key === "Enter") {
									submit(e)
								}
							}}
							maxLength={1000}
						/>
						<button
							type="submit"
							className={cn(buttonVariants({ color: "outline" }), "w-fit px-3")}
							disabled={isPending}
						>
							{isPending ? "Submitting..." : "Submit"}
						</button>
					</form>
				)}
			</CollapsibleContent>
		</Collapsible>
	)
}
