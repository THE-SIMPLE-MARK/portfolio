"use client"
import { Button, Dropdown } from "@heroui/react"
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button"
import {
	Check,
	ChevronDown,
	Copy,
	ExternalLinkIcon,
	MessageCircleIcon,
} from "lucide-react"
import { useMemo, useState } from "react"
import { FaGithub } from "react-icons/fa"
import { SiClaude, SiOpenai } from "react-icons/si"

const cache = new Map<string, string>()

export function LLMCopyButton({
	/**
	 * A URL to fetch the raw Markdown/MDX content of page
	 */
	markdownUrl,
}: {
	markdownUrl: string
}) {
	const [isLoading, setLoading] = useState(false)
	const [checked, onClick] = useCopyButton(async () => {
		const cached = cache.get(markdownUrl)
		if (cached) return navigator.clipboard.writeText(cached)

		setLoading(true)

		try {
			await navigator.clipboard.write([
				new ClipboardItem({
					"text/plain": fetch(markdownUrl).then(async res => {
						const content = await res.text()
						cache.set(markdownUrl, content)

						return content
					}),
				}),
			])
		} finally {
			setLoading(false)
		}
	})

	const Icon = checked ? Check : Copy

	return (
		<Button
			type="button"
			isPending={isLoading}
			onClick={onClick}
			size="sm"
			variant="tertiary"
		>
			<Icon className="size-3.5" />
			Copy Markdown
		</Button>
	)
}

export function ViewOptions({
	markdownUrl,
	githubUrl,
}: {
	/**
	 * A URL to the raw Markdown/MDX content of page
	 */
	markdownUrl: string

	/**
	 * Source file URL on GitHub
	 */
	githubUrl: string
}) {
	const items = useMemo(() => {
		const fullMarkdownUrl =
			typeof window !== "undefined"
				? new URL(markdownUrl, window.location.origin)
				: "loading"

		const q = `Read ${fullMarkdownUrl}, I want to ask questions about it.`

		return [
			{
				title: "Open in GitHub",
				href: githubUrl,
				icon: FaGithub,
			},
			{
				title: "Open in ChatGPT",
				href: `https://chatgpt.com/?${new URLSearchParams({
					hints: "search",
					q,
				})}`,
				icon: SiOpenai,
			},
			{
				title: "Open in Claude",
				href: `https://claude.ai/new?${new URLSearchParams({
					q,
				})}`,
				icon: SiClaude,
			},
			{
				title: "Open in T3 Chat",
				href: `https://t3.chat/new?${new URLSearchParams({
					q,
				})}`,
				icon: MessageCircleIcon,
			},
		]
	}, [githubUrl, markdownUrl])

	return (
		<Dropdown>
			<Button size="sm" variant="tertiary">
				Open
				<ChevronDown className="size-3.5" />
			</Button>
			<Dropdown.Popover>
				<Dropdown.Menu>
					{items.map(item => (
						<Dropdown.Item
							key={item.href}
							href={item.href}
							rel="noreferrer noopener"
							target="_blank"
						>
							<item.icon className="size-4" />
							{item.title}
							<ExternalLinkIcon className="text-fd-muted-foreground ml-auto size-3.5" />
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown.Popover>
		</Dropdown>
	)
}
