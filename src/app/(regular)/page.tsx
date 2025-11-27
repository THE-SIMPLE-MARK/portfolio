import Link from "next/link"
import { buttonVariants } from "~/components/ui/button"

export default function RegularPage() {
	return (
		<div className="text-center space-y-4">
			<h1 className="font-medium text-5xl font-handwritten">
				This is Márk Böszörményi.
			</h1>
			<p>
				This is going to be my portfolio kind of website soon™.
				<br /> For now, you can check out my blog {";)"}
			</p>

			<Link className={buttonVariants({ color: "primary" })} href="/blog">
				Open Blog
			</Link>
		</div>
	)
}
