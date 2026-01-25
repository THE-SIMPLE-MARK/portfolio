export type ProjectStatus = "DEPLOYED" | "IN_DEVELOPMENT" | "INACTIVE"

export interface Project {
	slug: string
	title: string
	description: string
	gradient: string
	imageUrl?: string
	ctaUrl: string
	techStack: string[]
	status: ProjectStatus
}

export const projects: Project[] = [
	{
		slug: "personal-site",
		title: "Lorem Ipsum",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		gradient: "from-pink-500 via-red-500 to-yellow-500",
		ctaUrl: "https://github.com/THE-SIMPLE-MARK/portfolio",
		techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
		status: "DEPLOYED",
	},
	{
		slug: "saas-dashboard",
		title: "Dolor Sit Amet",
		description:
			"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		gradient: "from-blue-400 via-indigo-500 to-purple-600",
		ctaUrl: "https://example.com/dashboard",
		techStack: ["React", "D3.js", "Supabase", "Redis"],
		status: "IN_DEVELOPMENT",
	},
	{
		slug: "ecommerce-engine",
		title: "Consectetur Elit",
		description:
			"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
		gradient: "from-emerald-400 via-cyan-500 to-blue-500",
		ctaUrl: "https://example.com/store",
		techStack: ["Node.js", "GraphQL", "PostgreSQL", "Stripe"],
		status: "INACTIVE",
	},
]
