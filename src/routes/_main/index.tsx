import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "~/components/ui/button";

export const Route = createFileRoute("/_main/")({
	component: Home,
});

function Home() {
	return (
		<div className="text-center space-y-4">
			<h1 className="font-medium text-5xl font-handwritten">
				This is Márk Böszörményi.
			</h1>
			<p>
				This is going to be my portfolio kind of website soon™.
				<br /> For now, you can check out my blog {";)"}
			</p>

			<Link
				className={buttonVariants({ color: "primary" })}
				to="/blog/$"
				params={{
					_splat: "",
				}}
			>
				Open Blog
			</Link>
		</div>
	);
}
