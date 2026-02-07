import { AppLayout } from "~/components/appLayout"

export default function RegularLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <AppLayout>{children}</AppLayout>
}
