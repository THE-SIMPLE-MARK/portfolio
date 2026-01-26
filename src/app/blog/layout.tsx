import { Button } from "@heroui/react"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { RootProvider } from "fumadocs-ui/provider/next"
import { ChevronLeft } from "lucide-react"
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
							<div className="flex items-center gap-3">
								<Button
									isIconOnly
									variant="tertiary"
									size="sm"
									className="rounded-lg border"
								>
									<ChevronLeft className="size-5" />
								</Button>
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
