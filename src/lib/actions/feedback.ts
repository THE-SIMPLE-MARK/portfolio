"use server"

import { ipAddress } from "@vercel/functions"
import { headers } from "next/headers"
import type { Feedback } from "~/components/feedback"
import { ratelimit } from "~/lib/redis"

export async function submitFeedback(feedback: Feedback) {
	// Get the user's IP address
	const headersList = await headers()
	const request = {
		headers: headersList,
	} as unknown as Request

	const ip = ipAddress(request)
	if (!ip && process.env.NODE_ENV === "production") {
		throw new Error("IP_ERROR")
	}

	// Rate limit check (5 submissions per 24h per IP)
	const { success } = await ratelimit.limit(ip ?? "127.0.0.1")
	if (!success) {
		throw new Error("RATE_LIMITED")
	}

	// Prepare Discord message
	const content = `🎉 New feedback received!

**Page**: ${feedback.path}
**Rating**: ${feedback.opinion === "good" ? "👍" : "👎"}
**Message**: ${feedback.message}`

	// Send to Discord
	if (!process.env.DISCORD_WEBHOOK_URL) {
		throw new Error("CONFIG_ERROR")
	}

	const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			content,
		}),
	})

	if (response.status === 429) {
		throw new Error("RATE_LIMITED")
	}

	if (!response.ok) {
		throw new Error("API_ERROR")
	}

	return {
		success: true,
		message: "Feedback submitted successfully",
	}
}
