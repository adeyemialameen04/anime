import {
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
import { getAnilistAnimeDetails } from "@/app/anime/dal";

export default async function AnimeDetail({
	params,
}: {
	params: { id: string; episodeId: string };
}) {
	const { id, episodeId: ep } = await params;

	return (
		<main className="py-4">
			<Suspense fallback={<Skeleton className="h-[470px] w-[850px]" />}>
				{/* <WatchDetails */}
				{/* 	servers={servers?.data} */}
				{/* 	sources={sources.data} */}
				{/* 	groupedEpisode={groupedEpisode} */}
				{/* 	allSources={allSources} */}
				{/* 	animeId={animeDetails.data.id} */}
				{/* /> */}
			</Suspense>
		</main>
	);
}
