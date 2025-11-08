import { Link } from "@tanstack/react-router";

export function Navbar() {
	return (
		<nav className="w-full absolute top-0 left-0 flex flex-row items-center justify-center gap-8 p-4 font-heading">
			<NavbarLink to="/" text="Home" />
			<span className="text-fd-muted-foreground line-through cursor-not-allowed">
				Projects
			</span>
			<NavbarLink to="https://github.com/THE-SIMPLE-MARK" text="GitHub" />
			<NavbarLink to="/blog/$" text="Blog" />
		</nav>
	);
}

export function NavbarLink({ to, text }: { to: string; text: string }) {
	return (
		<Link to={to} className="hover: transition-colors">
			{text}
		</Link>
	);
}
