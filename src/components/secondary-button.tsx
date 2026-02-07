import { buttonVariants } from "@heroui/react"
import Link from "next/link"
import type { ReactNode } from "react"

interface SecondaryButtonProps {
	href: string
	children: ReactNode
}

export function SecondaryButton({ href, children }: SecondaryButtonProps) {
	return (
		<Link
			href={href}
			className={buttonVariants({
				variant: "ghost",
				size: "lg",
				className:
					"text-muted-foreground font-mono border border-border hover:text-foreground hover:border-foreground rounded-none uppercase min-w-44 h-12 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
			})}
		>
			{children}
		</Link>
	)
}
