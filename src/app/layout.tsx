import "~/styles/globals.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { ThemeProvider } from "next-themes"

export const metadata: Metadata = {
	title: "Márk's Portfolio",
	description: "Márk Böszörményi's portfolio website.",
	icons: [{ rel: "icon", type: "image/svg+xml", url: "/logo.svg" }],
}

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
})

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
			<body>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
				</ThemeProvider>
				<Analytics scriptSrc="/a/script.js" />
				<SpeedInsights scriptSrc="/si/script.js" />
			</body>
		</html>
	)
}
