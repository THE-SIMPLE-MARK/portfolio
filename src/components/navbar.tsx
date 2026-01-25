"use client"

import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { cn } from "~/lib/cn"

export function Navbar() {
	const { scrollY } = useScroll()
	const [isScrolled, setIsScrolled] = useState(false)

	useMotionValueEvent(scrollY, "change", latest => {
		setIsScrolled(latest > 20)
	})

	return (
		<motion.nav
			className={cn(
				"w-full fixed top-0 left-0 flex flex-row items-center justify-center gap-8 p-4 font-heading z-50 transition-all duration-300 border-b border-transparent",
				isScrolled && "bg-background/80 backdrop-blur-md border-white/10",
			)}
		>
			<NavbarLink href="/" text="Home" />
			<NavbarLink href="/projects" text="Projects" />
			<NavbarLink href="https://github.com/THE-SIMPLE-MARK" text="GitHub" />
			<NavbarLink href="/blog" text="Blog" />
		</motion.nav>
	)
}

export function NavbarLink({ href, text }: { href: string; text: string }) {
	return (
		<Link
			href={href}
			className="relative text-sm font-medium hover:text-emerald-400 transition-colors uppercase tracking-widest"
		>
			{text}
		</Link>
	)
}
