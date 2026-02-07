import { buttonVariants } from "@heroui/react"
import Link from "next/link"
import type { ReactNode } from "react"

interface PrimaryButtonProps {
	href: string
	children: ReactNode
}

export function PrimaryButton({ href, children }: PrimaryButtonProps) {
	return (
		<Link
			href={href}
			className={buttonVariants({
				size: "lg",
				className:
					"bg-foreground text-background font-mono font-bold tracking-tight rounded-none border border-foreground hover:bg-muted hover:text-foreground uppercase min-w-44 h-12",
			})}
		>
			{children}
		</Link>
	)
}
