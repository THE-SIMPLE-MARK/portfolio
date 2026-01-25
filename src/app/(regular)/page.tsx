"use client"

import { Button } from "@heroui/react"
import { motion } from "framer-motion"
import Link from "next/link"
import { PerspectiveGrid } from "~/components/perspective-grid"
import { TextScramble } from "~/components/text-scramble"

export default function RegularPage() {
	return (
		<div className="relative flex-1 flex flex-col justify-center items-center text-center w-full">
			<PerspectiveGrid />

			<div className="space-y-8 z-10 max-w-4xl mx-auto px-4">
				<div className="space-y-2">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="text-accent font-mono text-sm tracking-widest uppercase mb-4"
					>
						System: Online
					</motion.div>

					<h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white">
						<TextScramble delay={0.5}>Márk</TextScramble>
						<br />
						<span className="text-zinc-500">
							<TextScramble delay={1.2}>Böszörményi</TextScramble>
						</span>
					</h1>
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 2.2, duration: 1 }}
					className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-mono"
				>
					<span className="text-accent">{">"}</span> Architecting{" "}
					<span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded-sm">
						high-performance
					</span>{" "}
					digital systems.
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 3, duration: 0.5 }}
					className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
				>
					<Button
						asChild
						size="lg"
						className="bg-white text-black font-mono font-bold tracking-tight rounded-none border border-white hover:bg-zinc-200 uppercase min-w-[160px] h-12"
					>
						<Link href="/projects">[ View Projects ]</Link>
					</Button>
					<Button
						asChild
						variant="ghost"
						size="lg"
						className="text-zinc-400 font-mono border border-zinc-700 hover:text-white hover:border-white rounded-none uppercase min-w-[160px] h-12 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
					>
						<Link href="/blog">:: Read Log ::</Link>
					</Button>
				</motion.div>
			</div>

			<div className="fixed top-20 left-4 w-4 h-4 border-l-2 border-t-2 border-accent opacity-30" />
			<div className="fixed top-20 right-4 w-4 h-4 border-r-2 border-t-2 border-accent opacity-30" />
			<div className="fixed bottom-20 left-4 w-4 h-4 border-l-2 border-b-2 border-accent opacity-30" />
			<div className="fixed bottom-20 right-4 w-4 h-4 border-r-2 border-b-2 border-accent opacity-30" />
		</div>
	)
}
