export type ProjectStatus = "DEPLOYED" | "IN_DEVELOPMENT" | "INACTIVE"

export interface Project {
	slug: string
	title: string
	description: string
	gradient: string
	imageUrl?: string
	ctaUrl?: string
	techStack: string[]
	status: ProjectStatus
}

export const projects: Project[] = [
	{
		slug: "highlighter",
		title: "Highlighter",
		description:
			"A native, user-friendly watchOS & iOS client for KRÉTA, the digital gradebook for Hungarian students. It also includes real-time widgets!",
		gradient: "from-emerald-400 via-cyan-500 to-blue-500",
		techStack: ["Swift", "SwiftUI", "Blood, sweat & tears"],
		status: "IN_DEVELOPMENT",
		imageUrl: "/projects/highlighter.svg",
	},
	{
		slug: "something",
		title: "Dolor Sit Amet",
		description:
			"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		gradient: "from-blue-400 via-indigo-500 to-purple-600",
		ctaUrl: "https://example.com/dashboard",
		techStack: ["React", "D3.js", "Supabase", "Redis"],
		status: "IN_DEVELOPMENT",
	},
	{
		slug: "another-thing",
		title: "Consectetur Elit",
		description:
			"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
		gradient: "from-pink-500 via-red-500 to-yellow-500",
		ctaUrl: "https://example.com/store",
		techStack: ["Node.js", "GraphQL", "PostgreSQL", "Stripe"],
		status: "INACTIVE",
	},
]
