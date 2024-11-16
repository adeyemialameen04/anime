"use client";

import { useLocalStorage } from "./use-local-storage";

interface EpisodeProgress {
	epTitle: string;
	epNum: number;
	timeWatched: number;
	duration: number;
	nextepNum: number | null;
	createdAt: string;
	episodeId: number;
}

interface VidstackSettings {
	[animeId: string]: EpisodeProgress;
}

function VideoProgressSave() {
	const [settings, setSettings] = useLocalStorage<VidstackSettings>(
		"vidstack_settings",
		{},
	);

	const getVideoProgress = (id: string): EpisodeProgress | undefined => {
		return settings[id];
	};

	const updateVideoProgress = (
		animeId: string,
		data: EpisodeProgress,
	): void => {
		const updatedSettings = { ...settings, [animeId]: data };
		setSettings(updatedSettings);
	};

	return [getVideoProgress, updateVideoProgress] as const;
}

export default VideoProgressSave;
