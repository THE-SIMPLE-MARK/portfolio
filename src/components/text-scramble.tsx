"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const CHARS = "-_~=+*!@#%^&()[]{}|;:,.<>?/"

export function TextScramble({
	children,
	className,
	duration = 0.8,
	delay = 0,
}: {
	children: string
	className?: string
	duration?: number
	delay?: number
}) {
	const [text, setText] = useState(children)
	const [_isScrambling, setIsScrambling] = useState(true)

	useEffect(() => {
		let interval: NodeJS.Timeout
		let startTime = Date.now()

		const startScramble = () => {
			interval = setInterval(() => {
				const progress = (Date.now() - startTime) / (duration * 1000)

				if (progress >= 1) {
					setText(children)
					setIsScrambling(false)
					clearInterval(interval)
					return
				}

				const scrambled = children
					.split("")
					.map((char, index) => {
						if (char === " ") return " "
						if (index / children.length < progress) return char
						return CHARS[Math.floor(Math.random() * CHARS.length)]
					})
					.join("")

				setText(scrambled)
			}, 30)
		}

		const timeout = setTimeout(() => {
			startTime = Date.now()
			startScramble()
		}, delay * 1000)

		return () => {
			clearInterval(interval)
			clearTimeout(timeout)
		}
	}, [children, duration, delay])

	return (
		<motion.span
			className={className}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, delay: delay }}
		>
			{text}
		</motion.span>
	)
}
