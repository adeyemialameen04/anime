import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { slugify } from "@/lib/helpers/slugify";
import { cn } from "@/lib/utils";
import { Heart, Play, Settings2, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ settings: string }>;
}>) {
	const currentPage = (await params).settings;
	const tabs = [
		{
			title: "Continue Watching",
			icon: Play,
		},
		{
			title: "Watchlist",
			icon: Heart,
		},
		{ title: "Profile", icon: User },
		{ title: "Settings", icon: Settings2 },
	];
	const isPageInTabs = tabs.some(
		(tab) => tab.title.toLowerCase() === currentPage.toLowerCase(),
	);
	if (!isPageInTabs) {
		return notFound();
	}

	return (
		<div className="container flex flex-col gap-3 pt-3">
			<Tabs defaultValue={currentPage.toLowerCase()}>
				<ScrollArea className="w-full mb-5">
					<TabsList className="inline-flex w-max gap-4 border-b bg-transparent py-6 md:gap-7">
						{tabs.map((tab) => (
							<TabsTrigger
								value={tab.title.toLowerCase()}
								key={tab.title}
								className={cn(
									"!shadow-none relative rounded-none bg-transparent capitalize text-neutral-500",
									"after:absolute after:bottom-[-10px] after:left-0 after:h-1 after:w-full after:rounded-t-md after:rounded-b-none after:bg-primary after:content-['']",
									"after:transition-all after:duration-300 after:ease-in-out",
									"after:scale-x-0 after:opacity-0",
									"data-[state=active]:after:scale-x-100 data-[state=active]:after:opacity-100",
								)}
								asChild
							>
								<Link href={`/user/${slugify(tab.title)}`}>
									{<tab.icon className="mr-2 h-4 w-4" />} {tab.title}
								</Link>
							</TabsTrigger>
						))}
					</TabsList>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>

				{children}
			</Tabs>
		</div>
	);
}
