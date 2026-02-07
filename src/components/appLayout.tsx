import type { ReactNode } from "react"
import { Footer } from "./footer"
import { Navbar } from "./navbar"
import { PerspectiveGrid } from "./perspective-grid"

interface AppLayoutProps {
	children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
	return (
		<div className="container mx-auto px-4 min-h-dvh flex flex-col pt-20">
			<Navbar />

			<main className="flex-1 w-full flex flex-col">
				<PerspectiveGrid />
				{children}
			</main>

			<Footer />
		</div>
	)
}
