import { Footer } from "~/components/footer"
import { MainLayout } from "~/components/mainLayout"

export default function RegularLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<MainLayout>
			<main className="flex-1 w-full flex flex-col gap-4 my-auto">
				{children}
			</main>

			<Footer />
		</MainLayout>
	)
}
