import { type NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
	const path = request.nextUrl.pathname
	const parts = path.split("/").filter(Boolean)

	// rewrite /blog/[[...slug]].md requests to /blog/markdown/[[...slug]]
	if (
		(parts[0] === "blog" || parts[0] === "blog.md") &&
		parts.at(-1)?.endsWith(".md")
	) {
		// don't rewrite if already in markdown endpoint
		if (parts[1] === "markdown") return

		const fileName = parts.at(-1)?.replace(/\.md$/, "")

		const slug =
			parts.length === 1
				? "" // /blog.md case
				: [...parts.slice(1, -1), fileName].join("/")

		const url = request.nextUrl.clone()
		url.pathname = slug ? `/blog/markdown/${slug}` : "/blog/markdown"

		return NextResponse.rewrite(url)
	}
}

export const config = {
	matcher: ["/blog.md", "/blog/:path*"],
}
