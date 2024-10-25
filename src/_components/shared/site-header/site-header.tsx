import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Mountain } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

export default function SiteHeader() {
	return (
		<header className="top-0 sticky z-[50] py-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex items-center justify-between gap-4">
				{/* <div className="flex items-center justify-between gap-3 max-w-screen-2xl mx-auto"> */}
				<div className="flex items-center gap-3">
					<Mountain size={18} />
					<MobileNav />
					<MainNav />
				</div>
				<div className="flex gap-3 items-center">
					<Input placeholder="Search Anything ..." />
					<Button variant={"ghost"} size={"sm"}>
						<Github size={17} />
					</Button>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
