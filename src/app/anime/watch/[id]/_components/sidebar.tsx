"use client";

import * as React from "react";
import {
	Check,
	ChevronsUpDown,
	GalleryVerticalEnd,
	Search,
} from "lucide-react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useSearchParams } from "next/navigation";

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
	const [selectedVersion, setSelectedVersion] = React.useState("Sub");

	// Find the active episode
	const activeEpisode = React.useMemo(() => {
		return episodes.find(
			(episode) => episode.id.split("=").pop() === currentEpisodeId,
		);
	}, [episodes, currentEpisodeId]);

	// Debounce search input to improve performance
	const debouncedSearchQuery = React.useMemo(() => {
		const timeoutId = setTimeout(() => searchQuery, 300);
		return () => clearTimeout(timeoutId);
	}, [searchQuery]);

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

	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton
										size="lg"
										className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
									>
										<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
											<GalleryVerticalEnd className="size-4" />
										</div>
										<div className="flex flex-col gap-0.5 leading-none">
											<span className="font-semibold">Type</span>
											<span className="">v{selectedVersion}</span>
										</div>
										<ChevronsUpDown className="ml-auto" />
									</SidebarMenuButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-[--radix-dropdown-menu-trigger-width]"
									align="start"
								>
									{navigationData.versions.map((version) => (
										<DropdownMenuItem
											key={version}
											onSelect={() => setSelectedVersion(version)}
										>
											v{version}{" "}
											{version === selectedVersion && (
												<Check className="ml-auto" />
											)}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					</SidebarMenu>
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
				<SidebarContent>
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
								<BreadcrumbPage>{episodeTitle}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
