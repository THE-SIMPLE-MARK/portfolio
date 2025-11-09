import { Link } from "@tanstack/react-router";
import { MainLayout } from "./mainLayout";

export function NotFound() {
	return (
		<MainLayout>
			<div className="flex flex-col items-center gap-4 text-center">
				<h1 className="text-9xl font-bold text-fd-muted-foreground">404</h1>
				<h2 className="text-5xl font-semibold font-handwritten mb-4">
					Page Not Found
				</h2>
				<p className="text-fd-muted-foreground max-w-md">
					The page you are looking for might have been removed, had its name
					changed, or is temporarily unavailable.
				</p>
				<Link
					to="/"
					className="mt-4 px-4 py-2 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
				>
					Back to Home
				</Link>
			</div>
		</MainLayout>
	);
}
