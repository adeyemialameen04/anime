"use client";
import { useState, useEffect, useRef } from "react";
import type { ServersData, Sourcedata } from "@/types/anime/anilist";
import {
	MediaPlayer,
	type MediaPlayerInstance,
	MediaProvider,
	Track,
} from "@vidstack/react";
import {
	defaultLayoutIcons,
	DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { RemotionPoster } from "@vidstack/react/player/remotion";
import Servers from "./servers";
import type { EnhancedSourcedata } from "../page";
import ToggleSettings, { type GroupedEpisode } from "./settings";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function WatchDetails({
	sources,
	servers,
	allSources,
	groupedEpisode,
	animeId,
}: {
	sources: Sourcedata;
	servers: ServersData;
	allSources: { sub: EnhancedSourcedata[]; dub: EnhancedSourcedata[] };
	groupedEpisode: GroupedEpisode;
	animeId: number;
}) {
	const playerRef = useRef<MediaPlayerInstance>(null);
	const settings = {
		autoSkip: true,
		autoPlay: true,
		autoNext: true,
	};
	const router = useRouter();
	const [currentSources, setCurrentSources] = useState<Sourcedata>(sources);
	const subtitles = currentSources.tracks.filter(
		(track) => track.kind === "captions",
	);
	const [currentSourceUrl, setCurrentSourceUrl] = useState(
		currentSources.sources[0].url,
	);
	const skiptimes = [
		{
			text: "Opening",
			startTime: currentSources.intro.start,
			endTime: currentSources.intro.end,
		},
		{
			text: "Ending",
			startTime: currentSources.outro.start,
			endTime: currentSources.outro.end,
		},
	];

	const handleServerSelect = (serverId: string, type: "sub" | "dub") => {
		const selectedSources = allSources[type].find(
			(source) => source.serverInfo.serverId === serverId,
		);
		console.log(selectedSources, serverId, type);
		if (selectedSources) {
			setCurrentSources(selectedSources);
			setCurrentSourceUrl(selectedSources.sources[0].url);
		}
	};

	useEffect(() => {
		playerRef.current?.subscribe(({ currentTime }) => {
			if (skiptimes && skiptimes.length > 0) {
				const openingStart = skiptimes[0]?.startTime ?? 0;
				const openingEnd = skiptimes[0]?.endTime ?? 0;

				const endingStart = skiptimes[1]?.startTime ?? 0;
				const endingEnd = skiptimes[1]?.endTime ?? 0;

				const opButtonText = skiptimes[0]?.text || "";
				const edButtonText = skiptimes[1]?.text || "";

				if (settings?.autoSkip) {
					if (
						opButtonText === "Opening" &&
						currentTime > openingStart &&
						currentTime < openingEnd
					) {
						Object.assign(playerRef.current ?? {}, { currentTime: openingEnd });
						return null;
					}
					if (
						edButtonText === "Ending" &&
						currentTime > endingStart &&
						currentTime < endingEnd
					) {
						Object.assign(playerRef.current ?? {}, { currentTime: endingEnd });
						return null;
					}
				}
			}
		});
	});

	function handleOpening() {
		console.log("Skipping Intro");
		Object.assign(playerRef.current ?? {}, {
			currentTime: skiptimes[0]?.endTime ?? 0,
		});
	}

	function handleEnding() {
		console.log("Skipping Outro");
		Object.assign(playerRef.current ?? {}, {
			currentTime: skiptimes[1]?.endTime ?? 0,
		});
	}

	const onEnded = () => {
		if (groupedEpisode.next) {
			console.log("Oya next");
			if (settings.autoNext) {
				console.log("pls next fr");
				router.push(
					`/anime/watch/${animeId}?ep=${groupedEpisode.next?.episodeId}`,
				);
			}
		}
	};

	return (
		<>
			<div className="md:container">
				<MediaPlayer
					playsInline
					src={currentSourceUrl}
					crossOrigin="anonymous"
					ref={playerRef}
					streamType="on-demand"
					className="md:container"
					onEnd={onEnded}
					onEnded={onEnded}
				>
					<MediaProvider>
						{subtitles.map((track) => (
							<Track
								src={track.file}
								label={track.label}
								lang=""
								kind="subtitles"
								key={track.label}
								default={track.label?.toLowerCase() === "english"}
							/>
						))}
						<RemotionPoster className="vds-poster" frame={10} />
					</MediaProvider>
					<DefaultVideoLayout icons={defaultLayoutIcons} />
					{!settings.autoSkip && (
						<>
							<Button
								onClick={handleOpening}
								className="absolute top-[40px] right-2 z-40 text-[15px]"
							>
								Skip Opening
							</Button>
							<Button
								onClick={handleEnding}
								className="absolute bottom-[70px] sm:bottom-[83px] right-4 z-[40] bg-white text-black py-2 px-3 rounded-[6px] font-medium text-[15px]"
							>
								Skip Ending
							</Button>
						</>
					)}
				</MediaPlayer>
			</div>
			<div className="flex container flex-col items-start mt-2">
				<ToggleSettings groupedEpisode={groupedEpisode} animeId={animeId} />
				<Servers servers={servers} onServerSelect={handleServerSelect} />
			</div>
		</>
	);
}
