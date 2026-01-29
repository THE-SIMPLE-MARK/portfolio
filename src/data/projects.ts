export type ProjectStatus = "DEPLOYED" | "IN_DEVELOPMENT" | "INACTIVE"

export interface Project {
	slug: string
	title: string
	overview: string
	description: string | string[]
	architecture: string
	specs: Record<string, string>
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
		overview:
			"A native, user-friendly watchOS & iOS client for KRÉTA, the digital gradebook for Hungarian students. It also includes real-time widgets!",
		description: [
			"Highlighter provides a seamless experience for Hungarian students to check their grades, view class schedules, and stay updated with real-time notifications. The app is built natively for iOS and watchOS, ensuring optimal performance and integration with Apple's ecosystem.",
			"The app contains numerous technical and UX optimizations, eliminating pain points found in the official apps reported by students. These improvements include the introduction of SWR, actually meaningful push notifications, color & -icon coded classes for easier recognition at a glance, proper homework message formatting.",
			"The watchOS companion app includes a real-time class tracker, allowing users to check the time remaining in a specific class, where their next class is, who their teacher will be, and much more!",
		],
		architecture:
			"Built with a modular SwiftUI architecture, Highlighter uses a multi-layer design pattern with a robust SWR networking & local data presistence layer for API communication. The watchOS companion app shares the same data synchronization logic through CloudKit, however both systems are completely redundant, so a phone isn't needed to get updates.",
		specs: {
			"Target Deployment": "iOS 18+, watchOS 10+",
			Database: "Core Data",
			"API Integration": "REST with OAuth 2.0",
			"Interaction time saved": "~3 mins / day",
		},
		gradient: "from-emerald-400 via-cyan-500 to-blue-500",
		techStack: ["Swift", "SwiftUI", "Blood, sweat & tears"],
		status: "IN_DEVELOPMENT",
		imageUrl: "/projects/highlighter.svg",
	},
	{
		slug: "something",
		title: "Dolor Sit Amet",
		overview:
			"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		description:
			"A comprehensive data visualization and analytics dashboard that transforms complex datasets into actionable insights. Built for real-time data streaming and interactive exploration of metrics across multiple dimensions.",
		architecture:
			"Event-driven architecture with a React frontend consuming real-time data via WebSockets, D3.js for sophisticated visualizations, and a Supabase backend with Redis caching layer for sub-second query responses. Horizontally scalable microservices handle data aggregation and transformation.",
		specs: {
			"Query Response Time": "<100ms",
			"Concurrent Users": "1000+",
			"Data Retention": "24 months",
			"Uptime SLA": "99.95%",
		},
		gradient: "from-blue-400 via-indigo-500 to-purple-600",
		ctaUrl: "https://example.com/dashboard",
		techStack: ["React", "D3.js", "Supabase", "Redis"],
		status: "IN_DEVELOPMENT",
	},
	{
		slug: "another-thing",
		title: "Consectetur Elit",
		overview:
			"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
		description:
			"An e-commerce platform designed for high-performance transactions with integrated payment processing. The system handles complex inventory management, order fulfillment, and customer relationship workflows.",
		architecture:
			"Serverless GraphQL API layer built with Node.js on AWS Lambda, connected to a PostgreSQL database with read replicas for performance optimization. Payment processing integrates with Stripe, and event-driven architecture handles asynchronous order processing through message queues.",
		specs: {
			"Transaction Throughput": "10k/sec",
			"Payment Success Rate": "99.8%",
			"Database Replicas": "3x",
			"Checkout Time": "<2s",
		},
		gradient: "from-pink-500 via-red-500 to-yellow-500",
		ctaUrl: "https://example.com/store",
		techStack: ["Node.js", "GraphQL", "PostgreSQL", "Stripe"],
		status: "INACTIVE",
	},
]
