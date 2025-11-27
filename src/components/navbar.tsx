import Link from "next/link"

export function Navbar() {
	return (
		<nav className="w-full absolute top-0 left-0 flex flex-row items-center justify-center gap-8 p-4 font-heading">
			<NavbarLink href="/" text="Home" />
			<span className="text-fd-muted-foreground line-through cursor-not-allowed">
				Projects
			</span>
			<NavbarLink href="https://github.com/THE-SIMPLE-MARK" text="GitHub" />
			<NavbarLink href="/blog" text="Blog" />
		</nav>
	)
}

export function NavbarLink({ href, text }: { href: string; text: string }) {
	return (
		<Link href={href} className="hover:transition-colors">
			{text}
		</Link>
	)
}
