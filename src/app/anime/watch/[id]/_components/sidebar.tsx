"use client";

import * as React from "react";
import { Search } from "lucide-react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import type { AnilistAnime, EpisodeList } from "@/types/anime/anilist";
import truncateText from "@/lib/helpers/truncate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCurrentEpisode } from "@/lib/utils/anime";

export default function EpisodesSidebar({
	episodes,
	children,
	anime,
}: {
	episodes: EpisodeList[];
	children: React.ReactNode;
	anime: AnilistAnime;
}) {
	const searchParams = useSearchParams();
	const currentEpisodeId = searchParams.get("ep");
	const [searchQuery, setSearchQuery] = React.useState("");

	const activeEpisode = getCurrentEpisode(episodes, currentEpisodeId as string);

	// Debounce search input to improve performance
	// const debouncedSearchQuery = React.useMemo(() => {
	// 	const timeoutId = setTimeout(() => searchQuery, 300);
	// 	return () => clearTimeout(timeoutId);
	// }, [searchQuery]);

	// Filter episodes based on search query
	const filteredEpisodes = React.useMemo(() => {
		if (!searchQuery.trim()) return episodes;

		const query = searchQuery.toLowerCase();
		return episodes.filter(
			(episode) =>
				episode.title.toLowerCase().includes(query) ||
				episode.number.toString().includes(query),
		);
	}, [episodes, searchQuery]);

	const navigationData = {
		versions: ["Sub", "Dub"],
		navMain: [
			{
				title: "Episodes",
				url: "#",
				items: filteredEpisodes.map((episode) => ({
					title: `${episode.number}. ${truncateText(episode.title, { maxLength: 30 })}`,
					url: `/anime/watch/${anime.id}?ep=${episode.id.split("=").pop()}`,
					isActive: episode.id.split("=").pop() === currentEpisodeId,
				})),
			},
		],
	};

	// Handle search input change
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	// Generate episode title for breadcrumb
	const episodeTitle = React.useMemo(() => {
		if (!activeEpisode) return "Select Episode";
		return `Episode ${activeEpisode.number}${activeEpisode.title ? `: ${activeEpisode.title}` : ""}`;
	}, [activeEpisode]);

	const createQueryString = React.useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	return (
		<SidebarProvider>
			<Sidebar className="">
				<SidebarHeader className="pt-5">
					<form onSubmit={(e) => e.preventDefault()}>
						<SidebarGroup className="py-0">
							<SidebarGroupContent className="relative">
								<Label htmlFor="search" className="sr-only">
									Search
								</Label>
								<SidebarInput
									id="search"
									placeholder="Search for episode..."
									className="pl-8"
									value={searchQuery}
									onChange={handleSearchChange}
								/>
								<Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
							</SidebarGroupContent>
						</SidebarGroup>
					</form>
				</SidebarHeader>
				<SidebarContent className="">
					{navigationData.navMain.map((item) => (
						<SidebarGroup key={item.title}>
							<SidebarGroupLabel>
								{item.title}{" "}
								{filteredEpisodes.length !== episodes.length &&
									`(${filteredEpisodes.length} results)`}
							</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{item.items.map((item, index) => (
										<SidebarMenuItem key={`${item.title}-${index}`}>
											<SidebarMenuButton asChild isActive={item.isActive}>
												<a href={item.url}>{item.title}</a>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</SidebarContent>
				<SidebarRail />
			</Sidebar>
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href={`/anime/${anime.id}`}>
									{anime.title.english}
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>
									{truncateText(episodeTitle, {
										maxLength: 70,
									})}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
