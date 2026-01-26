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
import { STATUS_COLORS } from "~/lib/colors"

export default function ProjectDetailPage() {
	const params = useParams()
	const project = projects.find(p => p.slug === params.slug)

	if (!project) {
		notFound()
	}

	const baseColor = STATUS_COLORS[project.status]
	const bgStatusColor = `bg-${baseColor}`
	const textStatusColor = `text-${baseColor}`

	return (
		<div className="min-h-screen pt-24 pb-20 px-4">
			<PerspectiveGrid />

			<div className="container mx-auto max-w-4xl">
				<Link
					href="/projects"
					className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 font-mono text-sm group"
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

						<h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground">
							{project.title}
						</h1>

						<p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
							{project.description}
						</p>

						<div className="flex flex-wrap gap-2 pt-4">
							{project.techStack.map(tech => (
								<span
									key={tech}
									className="font-mono text-sm px-3 py-1 bg-foreground/10 border border-foreground/10 text-foreground rounded-sm"
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
							"aspect-video rounded-lg bg-linear-to-br border border-border relative overflow-hidden group",
							project.gradient,
						)}
					>
						<div className="absolute inset-0 opacity-80" />
						<div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay pointer-events-none" />

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
								<div className="absolute inset-0 flex items-center justify-center font-mono text-foreground/50 text-xl tracking-widest">
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
							<p className="text-muted-foreground leading-relaxed">
								Designed with a focus on scalability and performance, this
								project leverages cutting-edge technologies to deliver optimal
								user experience. The backend architecture ensures high
								availability while the frontend is optimized for Core Web
								Vitals.
							</p>

							<div className="p-4 border border-border bg-card/70 font-mono text-sm text-muted-foreground">
								<div className="mb-2 text-foreground/50">
									{"// Technical Specs"}
								</div>
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
								className="w-full bg-foreground text-background font-mono font-bold tracking-tight rounded-none border border-foreground hover:bg-muted hover:text-foreground uppercase h-14"
							>
								<a
									href={project.ctaUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									Launch Project <ExternalLink className="ml-2 w-4 h-4" />
								</a>
							</Button>

							<div className="text-xs font-mono text-center text-muted-foreground">
								SECURE CONNECTION ESTABLISHED
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
