import { HeroLayout } from "~/components/heroLayout"

export default function RegularLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <HeroLayout>{children}</HeroLayout>
}
