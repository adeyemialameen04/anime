import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Mountain, Settings } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";
import Link from "next/link";
import { SearchDialog } from "./search-command";

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
					<div className="relative">
						<Input
							placeholder="Search Anything ..."
							name="Seach Query"
							disabled
						/>
						<p className="text-sm absolute top-[0.35rem] right-2 text-muted-foreground">
							<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
								<span className="text-xs">⌘</span>J
							</kbd>
						</p>
					</div>
					<Button variant={"ghost"} size={"sm"}>
						<Github size={17} />
					</Button>
					<Button variant={"ghost"} size={"sm"} asChild>
						<Link href={"/user/settings"}>
							<Settings size={17} />
						</Link>
					</Button>
					<ModeToggle />
				</div>
			</div>
			<SearchDialog />
		</header>
	);
}
