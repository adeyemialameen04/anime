import {
	getAnilistAnimeDetails,
	getAnilistEpisodeServers,
	getAnilistEpisodeSources,
} from "@/queries/anime/[id]";
import { notFound } from "next/navigation";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import WatchDetails from "./_components/details";
import type { ServersData, Sourcedata } from "@/types/anime/anilist";
import logServer from "@/lib/helpers";
import * as React from "react";
import { getCurrentEpisode } from "@/lib/utils/anime";

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
				const sources = await getAnilistEpisodeSources(
					episodeId,
					server.serverId,
				);

				if (sources?.data) {
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
	searchParams,
}: { params: { id: string }; searchParams: { ep?: string } }) {
	const { id } = await params;
	const { ep } = await searchParams;
	const servers = await getAnilistEpisodeServers(ep as string);
	if (!servers) {
		throw new Error("No servers found");
	}
	const allSources = await getAllSources(ep as string, servers.data);
	logServer(allSources);

	const sources = await getAnilistEpisodeSources(
		ep as string,
		servers.data.sub[0].serverId,
	);

	const animeDetails = await getAnilistAnimeDetails(id);
	if (!animeDetails) {
		notFound();
	}

	const activeEpisode = animeDetails.data.episodesList.find(
		(episode) => episode.id.split("=").pop() === ep,
	);
	const groupedEpisode = {
		current: activeEpisode?.episodeId,
		next: animeDetails.data.episodesList.find(
			(episode) => episode.episodeId === activeEpisode?.episodeId + 1,
		),
		prev: animeDetails.data.episodesList.find(
			(episode) => episode.episodeId === activeEpisode?.episodeId - 1,
		),
	};
	console.log(activeEpisode);

	if (!sources) {
		throw new Error("No sources found");
	}

	return (
		<main className="py-4">
			<Suspense fallback={<Skeleton className="h-[470px] w-[850px]" />}>
				<WatchDetails
					servers={servers?.data}
					sources={sources.data}
					groupedEpisode={groupedEpisode}
					allSources={allSources}
					animeId={animeDetails.data.id}
				/>
			</Suspense>
		</main>
	);
}
