"use client"
import { Button, FieldError, TextArea, TextField } from "@heroui/react"
import {
	Collapsible,
	CollapsibleContent,
} from "fumadocs-ui/components/ui/collapsible"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { usePathname } from "next/navigation"
import { type SyntheticEvent, useEffect, useState, useTransition } from "react"
import { submitFeedback } from "~/lib/actions/feedback"

export interface Feedback {
	opinion: "good" | "bad"
	path: string
	message: string
}

export function Feedback() {
	const path = usePathname()
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

				await submitFeedback(feedback)
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
			onOpenChange={v => {
				if (!v) setOpinion(null)
			}}
			id="feedback"
			className="border-y py-3"
		>
			<div className="flex flex-row items-center gap-2">
				<p className="text-sm font-medium pe-2">How is this blog?</p>
				<Button
					isDisabled={previous !== null}
					onPress={() => {
						setOpinion("good")
					}}
					variant={activeOpinion === "good" ? "primary" : "tertiary"}
				>
					<ThumbsUp />
					Good
				</Button>
				<Button
					isDisabled={previous !== null}
					onPress={() => {
						setOpinion("bad")
					}}
					variant={activeOpinion === "bad" ? "primary" : "tertiary"}
				>
					<ThumbsDown />
					Bad
				</Button>
			</div>

			<CollapsibleContent className="mt-3">
				{previous ? (
					<div className="px-3 py-6 flex flex-col items-center gap-3 bg-fd-card text-fd-muted-foreground text-sm text-center rounded-xl">
						<p>Thank you for your feedback! {":)"}</p>
						<div className="flex flex-row items-center gap-2">
							<Button
								onPress={() => {
									setOpinion(previous.opinion)
									setPrevious(null)
								}}
							>
								Submit Again
							</Button>
						</div>
					</div>
				) : (
					<form className="flex flex-col gap-3" onSubmit={submit}>
						<TextField value={message} onChange={setMessage} maxLength={1000}>
							<TextArea
								className="resize-y"
								placeholder="Leave your feedback..."
								required
								rows={4}
								onSubmit={submit}
							/>
							{error && <FieldError>{error}</FieldError>}
						</TextField>
						<Button type="submit" isPending={isPending}>
							{isPending ? "Submitting..." : "Submit"}
						</Button>
					</form>
				)}
			</CollapsibleContent>
		</Collapsible>
	)
}
