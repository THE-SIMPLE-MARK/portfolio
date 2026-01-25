import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { RootProvider } from "fumadocs-ui/provider/next"
import Image from "next/image"
import type { ReactNode } from "react"
import { PerspectiveGrid } from "~/components/perspective-grid"
import { StaticSearchDialog } from "~/components/search"
import { source } from "~/lib/mdx/source"

export default function BlogLayout({ children }: { children: ReactNode }) {
	return (
		<RootProvider search={{ SearchDialog: StaticSearchDialog }}>
			<PerspectiveGrid />
			<div className="flex flex-col min-h-screen">
				<DocsLayout
					nav={{
						title: (
							<div className="flex flex-row items-center gap-2">
								<Image src="/logo.svg" alt="Logo" width={24} height={24} />
								<span className="font-heading font-bold text-lg tracking-tight">
									SYSTEM_LOGS
								</span>
							</div>
						),
						transparentMode: "top",
					}}
					tree={source.pageTree}
					themeSwitch={{ mode: "light-dark-system" }}
				>
					{children}
				</DocsLayout>
			</div>
		</RootProvider>
	)
}
