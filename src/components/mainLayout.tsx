import { Footer } from "./footer";
import { Navbar } from "./navbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="container mx-auto px-4 h-screen flex">
			<Navbar />

			<main className="flex-1 w-full flex flex-col gap-4 my-auto">
				{children}
			</main>

			<Footer />
		</div>
	);
}
