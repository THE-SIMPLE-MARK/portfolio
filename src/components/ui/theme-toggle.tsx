"use client"

import { useTheme } from "next-themes"
import { useEffect, useState, type ComponentProps } from "react"
import { cva } from "class-variance-authority"
import { cn } from "~/lib/cn"
import { Airplay, Moon, Sun } from "lucide-react"

const itemVariants = cva(
	"size-6.5 rounded-full p-1.5 text-fd-muted-foreground",
	{
		variants: {
			active: {
				true: "bg-fd-accent text-fd-accent-foreground",
				false: "text-fd-muted-foreground",
			},
		},
	},
)

const themeOptions = [
	["light", Sun],
	["dark", Moon],
	["system", Airplay],
] as const

export function ThemeToggle({
	className,
	mode = "light-dark",
	...props
}: ComponentProps<"div"> & {
	mode?: "light-dark" | "light-dark-system"
}) {
	const { setTheme, theme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const containerStyles = cn(
		"inline-flex items-center rounded-full border p-1",
		className,
	)

	if (mode === "light-dark") {
		const value = mounted ? resolvedTheme : null
		return (
			<button
				type="button"
				className={containerStyles}
				aria-label="Toggle Theme"
				onClick={() => setTheme(value === "light" ? "dark" : "light")}
				data-theme-toggle=""
			>
				{themeOptions.map(([key, Icon]) => {
					if (key === "system") return null
					return (
						<Icon
							key={key}
							fill="currentColor"
							className={cn(itemVariants({ active: value === key }))}
						/>
					)
				})}
			</button>
		)
	}

	const value = mounted ? theme : null
	return (
		<div className={containerStyles} data-theme-toggle="" {...props}>
			{themeOptions.map(([key, Icon]) => (
				<button
					type="button"
					key={key}
					aria-label={`Set ${key} theme`}
					className={cn(itemVariants({ active: value === key }))}
					onClick={() => setTheme(key)}
				>
					<Icon className="size-full" fill="currentColor" />
				</button>
			))}
		</div>
	)
}
