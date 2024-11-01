"use client";
import { useState, useEffect, useRef } from "react";
import type { ServersData, Sourcedata } from "@/types/anime/anilist";
import {
	MediaPlayer,
	type MediaPlayerInstance,
	MediaProvider,
	Poster,
	Track,
	useMediaRemote,
	useMediaStore,
} from "@vidstack/react";
import {
	defaultLayoutIcons,
	DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import Servers from "./servers";
import type { EnhancedSourcedata } from "../page";
import ToggleSettings, { type GroupedEpisode } from "./settings";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getSettings } from "@/lib/helpers/anime/settings";
import VideoProgressSave from "@/hooks/video-progress-save";

export type PlayerSettings = {
	autoSkip: boolean;
	autoPlay: boolean;
	autoNext: boolean;
};

export default function WatchDetails({
	servers,
	allSources,
	groupedEpisode,
	animeId,
	poster,
}: {
	servers: ServersData;
	allSources: { sub: EnhancedSourcedata[]; dub: EnhancedSourcedata[] };
	groupedEpisode: GroupedEpisode;
	animeId: string;
	poster: string;
}) {
	const playerRef = useRef<MediaPlayerInstance>(null);
	const router = useRouter();
	const [currentSources, setCurrentSources] = useState<Sourcedata>(
		allSources.sub[0],
	);
	const [currentSourceUrl, setCurrentSourceUrl] = useState(
		currentSources.sources[0].url,
	);
	const [settings, setSettings] = useState<PlayerSettings>(
		getSettings() ?? {
			autoSkip: false,
		},
	);
	const [isOpening, setIsOpening] = useState(false);
	const [isEnding, setIsEnding] = useState(false);
	const subtitles = allSources.sub[0].tracks.filter(
		(track) => track.kind === "captions",
	);

	const [getVideoProgress, UpdateVideoProgress] = VideoProgressSave();
	const [progressSaved, setprogressSaved] = useState(false);
	let interval;
	const { duration } = useMediaStore(playerRef);
	const remote = useMediaRemote(playerRef);
	const [isPlaying, setIsPlaying] = useState(false);
	console.log(groupedEpisode);

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
		if (selectedSources) {
			setCurrentSources(selectedSources);
			setCurrentSourceUrl(selectedSources.sources[0].url);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		playerRef.current?.subscribe(({ currentTime }) => {
			if (skiptimes && skiptimes.length > 0) {
				const openingStart = skiptimes[0]?.startTime ?? 0;
				const openingEnd = skiptimes[0]?.endTime ?? 0;

				const endingStart = skiptimes[1]?.startTime ?? 0;
				const endingEnd = skiptimes[1]?.endTime ?? 0;

				const opButtonText = skiptimes[0]?.text || "";
				const edButtonText = skiptimes[1]?.text || "";

				setIsOpening(
					opButtonText === "Opening" &&
						currentTime > openingStart &&
						currentTime < openingEnd,
				);
				setIsEnding(
					edButtonText === "Ending" &&
						currentTime > endingStart &&
						currentTime < endingEnd,
				);

				if (settings.autoSkip) {
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
	}, [settings.autoSkip]);

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (isPlaying) {
			interval = setInterval(async () => {
				const currentTime = playerRef.current?.currentTime
					? Math.round(playerRef.current?.currentTime)
					: 0;

				UpdateVideoProgress(animeId, {
					epTitle:
						groupedEpisode?.current.title ||
						`EP ${groupedEpisode.current.number}`,
					epNum: Number(groupedEpisode.current.number),
					timeWatched: currentTime,
					duration: duration,
					nextepNum: groupedEpisode?.next || null,
					createdAt: new Date().toISOString(),
				});
				console.log("updating...", animeId);
			}, 5000);
		} else {
			clearInterval(interval);
		}

		return () => {
			clearInterval(interval);
		};
	}, [isPlaying, duration, animeId, groupedEpisode]);

	function onLoadedMetadata() {
		const seek = getVideoProgress(animeId);
		console.log(seek);
		if (seek?.epNum === Number(groupedEpisode.current.number)) {
			const seekTime = seek?.timeWatched;
			const percentage = duration !== 0 ? seekTime / Math.round(duration) : 0;

			if (percentage >= 0.95) {
				remote.seek(0);
			} else {
				remote.seek(seekTime);
			}
		}
	}

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
			if (settings.autoNext) {
				router.push(`/anime/watch/${animeId}/${groupedEpisode?.next}`);
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
					onLoadedMetadata={onLoadedMetadata}
					onPause={() => {
						setIsPlaying(false);
					}}
					onEnd={() => {
						setIsPlaying(false);
					}}
					onEnded={onEnded}
					loop={false}
					title={groupedEpisode.current.title}
					autoPlay={settings.autoPlay}
					onCanPlay={() => {
						setIsPlaying(true);
					}}
				>
					<MediaProvider>
						{[
							...new Map(
								subtitles.map((subtitle) => [subtitle.label, subtitle]),
							).values(),
						].map((track) => (
							<Track
								src={track.file}
								label={track.label}
								lang=""
								kind="subtitles"
								key={track.label}
								default={track.label?.toLowerCase() === "english"}
							/>
						))}
						<Poster
							className="vds-poster"
							src={poster}
							alt={groupedEpisode.current.title}
						/>
					</MediaProvider>
					<DefaultVideoLayout icons={defaultLayoutIcons} />
					{!settings.autoSkip && (
						<>
							{isOpening && (
								<Button
									onClick={handleOpening}
									className="absolute bottom-[70px] sm:bottom-[83px] right-4 z-[40] font-medium text-[15px]"
								>
									Skip Opening
								</Button>
							)}
							{isEnding && (
								<Button
									onClick={handleEnding}
									className="absolute bottom-[70px] sm:bottom-[83px] right-4 z-[40] font-medium text-[15px]"
								>
									Skip Ending
								</Button>
							)}
						</>
					)}
				</MediaPlayer>
			</div>
			<div className="flex container flex-col items-start mt-2">
				<ToggleSettings
					groupedEpisode={groupedEpisode}
					animeId={animeId}
					settings={settings}
					setSettings={setSettings}
				/>
				<Servers servers={servers} onServerSelect={handleServerSelect} />
			</div>
		</>
	);
}
