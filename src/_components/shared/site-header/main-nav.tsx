import { slugify } from "@/lib/helpers/slugify";
import menu_list from "@/lib/menu-list";
import Link from "next/link";

export default function MainNav() {
	return (
		<nav className="hidden md:flex gap-3 items-center">
			{menu_list.map((item) => (
				<Link
					href={slugify(item.href)}
					key={item.title}
					className="hover:text-foreground/80 text-foreground/60 transition-colors duration-150"
				>
					{item.title}
				</Link>
			))}
		</nav>
	);
}
