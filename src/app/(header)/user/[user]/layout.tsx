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
	params: Promise<{ user: string }>;
}>) {
	const currentPage = (await params).user;
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
		<div className="flex flex-col gap-3 container pt-3">
			<Tabs defaultValue={currentPage.toLowerCase()}>
				<TabsList className="mb-4 flex gap-4 md:gap-7 max-w-2xl bg-transparent border-b py-6 rounded-none justify-start">
					{tabs.map((tab) => (
						<TabsTrigger
							value={tab.title.toLowerCase()}
							key={tab.title}
							className={cn(
								"!shadow-none bg-transparent rounded-none capitalize text-neutral-500 relative",
								"after:absolute after:content-[''] after:h-1 after:w-full after:bg-primary after:bottom-[-10px]",
								"after:rounded-t-md after:rounded-b-none",
								"after:transition-all after:duration-300 after:ease-in-out",
								"after:opacity-0 after:scale-x-0",
								"data-[state=active]:after:opacity-100 data-[state=active]:after:scale-x-100",
							)}
							asChild
						>
							<Link href={`/user/${slugify(tab.title)}`}>
								{<tab.icon className="w-4 h-4 mr-2" />} {tab.title}
							</Link>
						</TabsTrigger>
					))}
				</TabsList>
				{children}
			</Tabs>
		</div>
	);
}
