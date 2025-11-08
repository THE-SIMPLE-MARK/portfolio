import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MainLayoutWrapper } from "~/components/mainLayoutWrapper";

export const Route = createFileRoute("/_main")({
	component: MainLayout,
});

function MainLayout() {
	return (
		<MainLayoutWrapper>
			<Outlet />
		</MainLayoutWrapper>
	);
}
