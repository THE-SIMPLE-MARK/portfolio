import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/")({
	component: Home,
});

function Home() {
	return (
		<div className="text-center">
			<h1 className="font-medium text-5xl mb-4 font-handwritten">
				This is Márk Böszörményi.
			</h1>
			<p>
				This is going to be my portfolio kind of website soon™.
				<br /> For now, you can check out my blog {";)"}
			</p>
			<Link
				to="/blog/$"
				params={{
					_splat: "",
				}}
				className="mt-4 inline-block px-3 py-2 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium text-sm mx-auto"
			>
				Open Blog
			</Link>
		</div>
	);
}
