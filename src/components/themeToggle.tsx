"use client"

import { Airplay, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { type ComponentProps, useEffect, useState } from "react"
import { cn } from "~/lib/cn"

const THEMES = [
	["light", Sun] as const,
	["dark", Moon] as const,
	["system", Airplay] as const,
] as const

export function ThemeToggle({ className, ...props }: ComponentProps<"div">) {
	const { setTheme, theme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	function isActive(key: string) {
		return mounted && theme === key
	}

	return (
		<div
			data-theme-toggle
			className={cn(
				"inline-flex items-center rounded-full border p-1",
				className,
			)}
			{...props}
		>
			{THEMES.map(([key, Icon]) => (
				<button
					type="button"
					key={key}
					aria-label={key}
					onClick={() => setTheme(key)}
					className={cn(
						"size-6.5 rounded-full p-1.5 transition-colors",
						isActive(key)
							? "bg-fd-accent text-fd-accent-foreground"
							: "text-fd-muted-foreground hover:text-fd-foreground",
					)}
				>
					<Icon className="size-full" fill="currentColor" />
				</button>
			))}
		</div>
	)
}
