"use client"

import { motion } from "framer-motion"
import { HeroContent } from "~/components/heroContent"
import { PrimaryButton } from "~/components/primary-button"
import { SecondaryButton } from "~/components/secondary-button"
import { TextScramble } from "~/components/text-scramble"

export default function RegularPage() {
	return (
		<HeroContent>
			<div className="space-y-2">
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 2.2 }}
					className="text-accent font-mono text-sm tracking-widest uppercase mb-4"
				>
					Freelance developer
				</motion.p>

				<h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground">
					<TextScramble delay={0.5}>Márk</TextScramble>
					<br />
					<span className="text-muted-foreground">
						<TextScramble delay={1.2}>Böszörményi</TextScramble>
					</span>
				</h1>
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 2.2, duration: 1 }}
				className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-mono"
			>
				<span className="text-accent">{">"}</span> Architecting{" "}
				<span className="text-foreground font-bold bg-foreground/10 px-2 py-0.5 rounded-sm">
					high-performance
				</span>{" "}
				digital systems.
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 3, duration: 0.5 }}
				className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
			>
				<PrimaryButton href="/projects">[ View Projects ]</PrimaryButton>
				<SecondaryButton href="/blog">:: Read Log ::</SecondaryButton>
			</motion.div>
		</HeroContent>
	)
}
