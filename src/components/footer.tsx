import { ThemeToggle } from "~/components/ui/theme-toggle"
import { RootProvider } from "fumadocs-ui/provider/next"

export function Footer() {
	return (
		<footer className="w-full absolute bottom-0 left-0 flex flex-row items-center justify-between gap-4 p-4">
			<div className="flex flex-col gap-1 sm:flex-row text-xs text-fd-muted-foreground">
				<p>Copyright © Márk Böszörményi.</p>
				<p className="hidden sm:block">All rights reserved.</p>
			</div>

			<RootProvider>
				<ThemeToggle
					className="*:size-6 sm:*:size-6.5"
					mode="light-dark-system"
				/>
			</RootProvider>
		</footer>
	)
}
