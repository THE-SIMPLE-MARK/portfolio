import { MainLayout } from "~/components/mainLayout"

export default function RegularLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <MainLayout>{children}</MainLayout>
}
