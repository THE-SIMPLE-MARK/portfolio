"use client"

import { motion } from "framer-motion"
import { AppLayout } from "~/components/appLayout"
import { HeroContent } from "~/components/heroContent"
import { PrimaryButton } from "~/components/primary-button"
import { SecondaryButton } from "~/components/secondary-button"

export default function NotFound() {
	return (
		<AppLayout>
			<HeroContent>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="space-y-6"
				>
					<h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-foreground font-mono leading-none">
						404
					</h1>

					<div className="space-y-3">
						<h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
							Page Not Found
						</h2>
						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-mono">
							<span className="text-accent">{">"}</span> The page you are
							looking for might have been removed, had its name changed, or is
							temporarily unavailable.
						</p>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.5 }}
					className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
				>
					<PrimaryButton href="/">[ Return Home ]</PrimaryButton>
					<SecondaryButton href="/projects">
						:: View Projects ::
					</SecondaryButton>
				</motion.div>
			</HeroContent>
		</AppLayout>
	)
}
