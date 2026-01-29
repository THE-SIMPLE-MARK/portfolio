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
]
