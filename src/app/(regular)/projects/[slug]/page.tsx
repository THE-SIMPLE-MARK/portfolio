"use client"

import { Button } from "@heroui/react"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { PerspectiveGrid } from "~/components/perspective-grid"
import { projects } from "~/data/projects"
import { cn } from "~/lib/cn"

const BG_STATUS_COLORS = {
	DEPLOYED: "bg-emerald-500",
	IN_DEVELOPMENT: "bg-amber-500",
	INACTIVE: "bg-rose-500",
}

const TEXT_STATUS_COLORS = {
	DEPLOYED: "text-emerald-500",
	IN_DEVELOPMENT: "text-amber-500",
	INACTIVE: "text-rose-500",
}

export default function ProjectDetailPage() {
	const params = useParams()
	const project = projects.find(p => p.slug === params.slug)

	if (!project) {
		notFound()
	}

	const bgStatusColor = BG_STATUS_COLORS[project.status]
	const textStatusColor = TEXT_STATUS_COLORS[project.status]

	return (
		<div className="min-h-screen pt-24 pb-20 px-4">
			<PerspectiveGrid />

			<div className="container mx-auto max-w-4xl">
				<Link
					href="/projects"
					className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-8 font-mono text-sm group"
				>
					<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
					BACK_TO_INDEX
				</Link>

				<header className="mb-12 relative">
					<div
						className={cn(
							"absolute -inset-4 bg-linear-to-r opacity-20 blur-3xl z-[-1]",
							project.gradient,
						)}
					/>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="space-y-6"
					>
						<div className="flex items-center gap-3">
							<span
								className={cn(
									"w-2 h-2 rounded-full animate-pulse",
									bgStatusColor,
								)}
							/>
							<span
								className={cn(
									"font-mono text-sm tracking-widest",
									textStatusColor,
								)}
							>
								STATUS: {project.status.replace("_", " ")}
							</span>
						</div>

						<h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
							{project.title}
						</h1>

						<p className="text-xl text-zinc-300 max-w-2xl leading-relaxed">
							{project.description}
						</p>

						<div className="flex flex-wrap gap-2 pt-4">
							{project.techStack.map(tech => (
								<span
									key={tech}
									className="font-mono text-sm px-3 py-1 bg-white/10 border border-white/10 text-white rounded-sm"
								>
									{tech}
								</span>
							))}
						</div>
					</motion.div>
				</header>

				<div className="grid gap-8">
					{/* Main Visual */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.3 }}
						className={cn(
							"aspect-video rounded-lg bg-linear-to-br border border-white/10 relative overflow-hidden group",
							project.gradient,
						)}
					>
						<div className="absolute inset-0 opacity-80" />

						{project.imageUrl ? (
							<Image
								src={project.imageUrl}
								alt={project.title}
								fill
								className="object-cover transition-opacity duration-700 opacity-0"
								onLoadingComplete={img => img.classList.remove("opacity-0")}
								priority
							/>
						) : (
							<>
								<div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
								<div className="absolute inset-0 flex items-center justify-center font-mono text-white/50 text-xl tracking-widest">
									[ SYSTEM VISUALIZATION ]
								</div>
							</>
						)}
					</motion.div>

					<div className="flex flex-col md:flex-row gap-8 mt-8">
						<div className="flex-1 space-y-6">
							<h3 className="text-2xl font-bold font-mono">
								System Architecture
							</h3>
							<p className="text-zinc-400 leading-relaxed">
								Designed with a focus on scalability and performance, this
								project leverages cutting-edge technologies to deliver optimal
								user experience. The backend architecture ensures high
								availability while the frontend is optimized for Core Web
								Vitals.
							</p>

							<div className="p-4 border border-zinc-800 bg-zinc-900/50 font-mono text-sm text-zinc-400">
								<div className="mb-2 text-zinc-500">{"// Technical Specs"}</div>
								<div className="grid grid-cols-2 gap-2">
									<div>Latency: &lt;50ms</div>
									<div>Uptime: 99.99%</div>
									<div>Build: v2.4.0</div>
									<div>Region: global-edge</div>
								</div>
							</div>
						</div>

						<div className="w-full md:w-64 shrink-0 space-y-4">
							<Button
								asChild
								size="lg"
								className="w-full bg-white text-black font-mono font-bold tracking-tight rounded-none border border-white hover:bg-zinc-200 uppercase h-14"
							>
								<a
									href={project.ctaUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									Launch Project <ExternalLink className="ml-2 w-4 h-4" />
								</a>
							</Button>

							<div className="text-xs font-mono text-center text-zinc-600">
								SECURE CONNECTION ESTABLISHED
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
