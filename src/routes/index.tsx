import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 items-center justify-center px-2">
      <div className="text-center">
        <h1 className="font-medium text-5xl mb-4 font-handwritten">
          This is Márk Böszörményi.
        </h1>
        <p>
          This is going to be my portfolio kind of website. Coming soon{" "}
          <sup>TM</sup>. <br /> For now, you can check out my blog {";)"}
        </p>
      </div>

      <Link
        to="/blog/$"
        params={{
          _splat: "",
        }}
        className="px-3 py-2 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium text-sm mx-auto"
      >
        Open Blog
      </Link>
    </div>
  );
}
