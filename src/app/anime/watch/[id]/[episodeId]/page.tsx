import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getEpisodeServers, getEpisodeSources } from "./dal";
import { getAnilistAnimeDetails } from "@/app/anime/dal";

export default async function AnimeDetail({
	params,
}: {
	params: { id: string; episodeId: string };
}) {
	const { id, episodeId: ep } = await params;
	const [animeDetails, servers, sources] = await Promise.all([
		getAnilistAnimeDetails(id),
		getEpisodeServers(ep),
		getEpisodeSources(ep),
	]);
	const episodeNum = ep.split("-").pop();

	const skipResponse = await fetch(
		`https://api.aniskip.com/v2/skip-times/${animeDetails?.data?.idMal}/${Number.parseInt(episodeNum as string)}?types[]=ed&types[]=mixed-ed&types[]=mixed-op&types[]=op&types[]=recap&episodeLength=`,
	);
	console.log(
		`https://api.aniskip.com/v2/skip-times/${animeDetails?.data?.idMal}/${Number.parseInt(episodeNum as string)}?types[]=ed&types[]=mixed-ed&types[]=mixed-op&types[]=op&types[]=recap&episodeLength=`,
	);
	const skipData = await skipResponse.json();
	console.log(skipData);

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
