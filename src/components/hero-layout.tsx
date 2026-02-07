import type { ReactNode } from "react"
import { PerspectiveGrid } from "./perspective-grid"

interface HeroLayoutProps {
	children: ReactNode
}

export function HeroLayout({ children }: HeroLayoutProps) {
	return (
		<div className="relative flex-1 flex flex-col justify-center items-center text-center w-full min-h-screen">
			<PerspectiveGrid />

			<div className="z-10 max-w-4xl mx-auto px-4">{children}</div>

			<div className="fixed top-20 left-4 w-4 h-4 border-l-2 border-t-2 border-accent opacity-30" />
			<div className="fixed top-20 right-4 w-4 h-4 border-r-2 border-t-2 border-accent opacity-30" />
			<div className="fixed bottom-20 left-4 w-4 h-4 border-l-2 border-b-2 border-accent opacity-30" />
			<div className="fixed bottom-20 right-4 w-4 h-4 border-r-2 border-b-2 border-accent opacity-30" />
		</div>
	)
}
