// this cannot be deduped because tailwind won't be able to detect dynamically constructed classes

export const BG_STATUS_COLORS = {
	DEPLOYED: "bg-accent",
	IN_DEVELOPMENT: "bg-amber-500",
	INACTIVE: "bg-rose-500",
} as const

export const TEXT_STATUS_COLORS = {
	DEPLOYED: "text-accent",
	IN_DEVELOPMENT: "text-amber-500",
	INACTIVE: "text-rose-500",
} as const

export const BG_HOVER_STATUS_COLORS = {
	DEPLOYED: "group-hover:bg-accent",
	IN_DEVELOPMENT: "group-hover:bg-amber-500",
	INACTIVE: "group-hover:bg-rose-500",
} as const
