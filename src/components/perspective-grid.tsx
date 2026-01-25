"use client"

import { motion } from "framer-motion"

export const PerspectiveGrid = () => {
	return (
		<div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
			<div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-1 bg-size-[100%_2px,3px_100%] pointer-events-none opacity-20" />

			<div className="absolute inset-0 perspective-[1000px]">
				<motion.div
					initial={{ opacity: 0, translateY: "0%" }}
					animate={{
						opacity: 1,
						translateY: "5%",
					}}
					transition={{
						opacity: { duration: 1.5 },
						translateY: {
							repeat: Infinity,
							duration: 20,
							ease: "linear",
						},
					}}
					className="absolute -inset-full w-[300%] h-[300%] origin-center rotate-x-60"
					style={{
						backgroundSize: "60px 60px",
						backgroundImage:
							"linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
					}}
				/>
			</div>

			{/* Vignette */}
			<div
				className="absolute inset-0 z-2"
				style={{
					background:
						"radial-gradient(circle at center, transparent 0%, var(--vignette-color) 100%)",
				}}
			/>
		</div>
	)
}
