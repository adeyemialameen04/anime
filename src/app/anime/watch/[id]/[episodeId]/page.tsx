import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getEpisodeServers, getEpisodeSources } from "./dal";
import { getHiAnimeDetails } from "@/app/anime/dal";
import type { Sourcedata, ServersData } from "@/types/anime/anilist";
import WatchDetails from "./_components/details";
import { defaultCovers } from "@/data/cover";
import logServer from "@/lib/helpers";

export interface EnhancedSourcedata extends Sourcedata {
	serverInfo: {
		serverId: string;
		serverName: string;
	};
}

async function getAllSources(
	episodeId: string,
	servers: ServersData,
): Promise<{ sub: EnhancedSourcedata[]; dub: EnhancedSourcedata[] }> {
	const allSources: { sub: EnhancedSourcedata[]; dub: EnhancedSourcedata[] } = {
		sub: [],
		dub: [],
	};

	// Helper function to fetch sources for a specific server type
	async function fetchSourcesForType(serverType: "sub" | "dub") {
		const promises = servers[serverType].map(async (server) => {
			try {
				const sources = await getEpisodeSources(episodeId, server.serverId);

				if (sources?.data?.sources && sources.data.sources.length > 0) {
					// Enhance each source with server information
					const enhancedSource: EnhancedSourcedata = {
						...sources.data,
						serverInfo: {
							serverId: server.serverId,
							serverName: server.serverName,
						},
					};
					return enhancedSource;
				}
				return null;
			} catch (error) {
				console.error(
					`Error fetching sources for ${serverType} server ${server.serverId}:`,
					error,
				);
				return null;
			}
		});

		// Filter out null values from failed requests
		const results = (await Promise.all(promises)).filter(
			(source): source is EnhancedSourcedata => source !== null,
		);
		allSources[serverType] = results;
	}

	await Promise.all([fetchSourcesForType("sub"), fetchSourcesForType("dub")]);
	return allSources;
}

export default async function AnimeDetail({
	params,
}: {
	params: { id: string; episodeId: string };
}) {
	const { id, episodeId: ep } = await params;
	const [animeDetails, servers] = await Promise.all([
		getHiAnimeDetails(id),
		getEpisodeServers(ep),
	]);
	const episodes = await animeDetails.data.episodes;
	const allSources = await getAllSources(ep, servers?.data);
	const random = Math.floor(Math.random() * 5);
	// console.log("\n\n\n", allSources, "\n\n\n");

	const activeEpisode = episodes.find(
		(episode) => episode.id.split("=").pop() === ep,
	);
	const currentIndex = episodes.findIndex(
		(episode) => episode.episodeId === activeEpisode?.episodeId,
	);

	const groupedEpisode = {
		current: activeEpisode,
		next:
			currentIndex >= 0 && currentIndex < episodes.length - 1
				? episodes[currentIndex + 1].episodeId
				: null,
		prev: currentIndex > 0 ? episodes[currentIndex - 1].episodeId : null,
	};
	logServer(allSources);

	return (
		<main className="py-4">
			<Suspense fallback={<Skeleton className="h-[470px] w-[850px]" />}>
				<WatchDetails
					servers={servers?.data}
					groupedEpisode={groupedEpisode}
					allSources={allSources}
					animeId={id}
					poster={
						animeDetails?.data?.anilist?.bannerImage || defaultCovers[random]
					}
				/>
			</Suspense>
		</main>
	);
}
