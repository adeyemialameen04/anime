import {
	getAnilistAnimeDetails,
	getAnilistEpisodeServers,
	getAnilistEpisodeSources,
} from "@/queries/anime/[id]";
import { notFound } from "next/navigation";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
	defaultLayoutIcons,
	DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { Track } from "@vidstack/react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { RemotionPoster } from "@vidstack/react/player/remotion";

export default async function AnimeDetail({
	params,
	searchParams,
}: { params: { id: string }; searchParams: { ep?: string } }) {
	const { id } = await params;
	const { ep } = await searchParams;
	const servers = await getAnilistEpisodeServers(ep);
	const sources = await getAnilistEpisodeSources(
		ep,
		servers.data.sub[0].serverId,
	);

	const animeDetails = await getAnilistAnimeDetails(id);
	if (!animeDetails) {
		notFound();
	}
	console.log(sources?.data.tracks);

	if (!sources) {
		return <div>No sources available</div>;
	}

	console.log(servers);

	// const englishSource = sources.data.tracks.find(
	// 	(track) => track.label?.toLowerCase() === "english",
	// );

	const defaultSourceUrl = sources.data.sources[0].url;

	return (
		<main className="md:container py-4">
			<Suspense fallback={<Skeleton className="h-[470px] w-[850px]" />}>
				<MediaPlayer src={defaultSourceUrl}>
					<MediaProvider>
						{sources.data.tracks
							.filter((track) => track.kind === "captions")
							.map((track) => (
								<Track
									src={track.file}
									label={track.label}
									lang=""
									kind="subtitles"
									key={track.label}
								/>
							))}
						{/* {englishSource && ( */}
						{/* 	<Track */}
						{/* 		src={englishSource?.file} */}
						{/* 		kind="subtitles" */}
						{/* 		label="English" */}
						{/* 		lang="en-US" */}
						{/* 		default */}
						{/* 	/> */}
						{/* )} */}
						<RemotionPoster className="vds-poster" frame={10} />
					</MediaProvider>
					<DefaultVideoLayout icons={defaultLayoutIcons} />
				</MediaPlayer>
			</Suspense>
		</main>
	);
}
