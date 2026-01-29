"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PerspectiveGrid } from "~/components/perspective-grid"
import { type Project, projects } from "~/data/projects"
import { cn } from "~/lib/cn"
import { BG_HOVER_STATUS_COLORS } from "~/lib/colors"

export default function ProjectsPage() {
	return (
		<div className="min-h-screen pt-24 pb-20 px-4">
			<PerspectiveGrid />

			<div className="container mx-auto max-w-6xl">
				<header className="mb-16 space-y-4">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-4xl md:text-6xl font-bold font-mono tracking-tighter"
					>
						Index / Projects
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="text-muted-foreground font-mono"
					>
						[ Selected works 2024 - 2026 ]
					</motion.p>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{projects.map((project, index) => (
						<ProjectCard
							key={project.slug}
							project={project}
							index={index}
							shouldCenter={projects.length === 1}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

function ProjectCard({
	project,
	index,
	shouldCenter,
}: {
	project: Project
	index: number
	shouldCenter: boolean
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.1 + 0.3 }}
			className={cn(
				"group relative bg-card/50 border border-border hover:border-foreground/50 transition-all duration-500 overflow-hidden",
				shouldCenter && "md:col-start-2 lg:col-start-2",
			)}
		>
			<div
				className={cn(
					"absolute inset-0 bg-linear-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none",
					project.gradient,
				)}
			/>

			<div className="relative p-6 h-full flex flex-col z-10">
				<div className="flex justify-between items-start mb-4">
					<div className="font-mono text-xs text-muted-foreground">
						{(index + 1).toString().padStart(2, "0")} {"//"}
					</div>
					<div className="flex gap-2">
						<div
							className={cn(
								"w-1.5 h-1.5 rounded-full bg-border transition-colors duration-300",
								BG_HOVER_STATUS_COLORS[project.status],
							)}
						/>
					</div>
				</div>

				<div className="w-full aspect-video mb-6 rounded-sm overflow-hidden relative group-hover:scale-105 transition-transform duration-700 ease-out bg-card border border-border">
					{project.imageUrl ? (
						<Image
							src={project.imageUrl}
							alt={project.title}
							fill
							className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-80"
							onLoadingComplete={img => img.classList.remove("opacity-0")}
						/>
					) : (
						<div className="absolute inset-0 flex items-center justify-center font-mono text-foreground text-xs tracking-widest font-bold">
							<div
								className={cn(
									"absolute inset-0 bg-linear-to-br opacity-80",
									project.gradient,
								)}
							/>
							<div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay" />
							<span className="relative z-10 px-4 text-center drop-shadow-md text-white">
								[ SYSTEM VISUALIZATION ]
							</span>
						</div>
					)}
				</div>

				<h3 className="text-xl font-bold font-mono tracking-tight mb-2 group-hover:text-accent transition-colors">
					{project.title}
				</h3>

				<p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-4">
					{project.overview}
				</p>

				<div className="flex flex-wrap gap-2 mb-6">
					{project.techStack.map(tech => (
						<span
							key={tech}
							className="text-xs font-mono uppercase tracking-wider px-2 py-1 bg-foreground/5 border border-foreground/10 rounded-sm text-muted-foreground"
						>
							{tech}
						</span>
					))}
				</div>

				<div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
					<Link
						href={`/projects/${project.slug}`}
						className="flex items-center gap-2 text-sm font-bold hover:text-accent transition-colors"
					>
						DETAILS <ArrowUpRight className="w-4 h-4" />
					</Link>

					{project.ctaUrl && (
						<a
							href={project.ctaUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors ml-auto"
						>
							VIEW <ExternalLink className="w-3 h-3" />
						</a>
					)}
				</div>
			</div>

			<div
				className={cn(
					"absolute top-0 left-0 w-2 h-2 border-l border-t border-border group-hover:border-accent transition-colors",
				)}
			/>
			<div
				className={cn(
					"absolute bottom-0 right-0 w-2 h-2 border-r border-b border-border group-hover:border-accent transition-colors",
				)}
			/>
		</motion.div>
	)
}
