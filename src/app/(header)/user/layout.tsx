import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Heart, Play, Settings2, User } from "lucide-react";
import React from "react";

export default function UserLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
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

	return (
		<div className="flex flex-col gap-3 container">
			<div></div>
			<Tabs>
				<TabsList className="mb-4 flex gap-4 md:gap-7 max-w-max bg-transparent border-b py-6 rounded-none justify-start">
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
						>
							{<tab.icon className="w-4 h-4 mr-2" />} {tab.title}
						</TabsTrigger>
					))}
				</TabsList>
				{children}
			</Tabs>
		</div>
	);
}
