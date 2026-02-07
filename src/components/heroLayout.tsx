import type { ReactNode } from "react"
import { Footer } from "./footer"
import { Navbar } from "./navbar"
import { PerspectiveGrid } from "./perspective-grid"

interface HeroLayoutProps {
	children: ReactNode
}

export function HeroLayout({ children }: HeroLayoutProps) {
	return (
		<div className="container mx-auto px-4 min-h-dvh flex flex-col pt-20">
			<Navbar />

			<main className="flex-1 w-full flex flex-col justify-center items-center text-center">
				<PerspectiveGrid />

				<div className="relative flex-1 flex flex-col justify-center items-center text-center w-full">
					<div className="space-y-8 z-10 max-w-4xl mx-auto px-4">
						{children}
					</div>

					<div className="fixed top-20 left-4 w-4 h-4 border-l-2 border-t-2 border-accent opacity-30" />
					<div className="fixed top-20 right-4 w-4 h-4 border-r-2 border-t-2 border-accent opacity-30" />
					<div className="fixed bottom-20 left-4 w-4 h-4 border-l-2 border-b-2 border-accent opacity-30" />
					<div className="fixed bottom-20 right-4 w-4 h-4 border-r-2 border-b-2 border-accent opacity-30" />
				</div>
			</main>

			<Footer />
		</div>
	)
}
