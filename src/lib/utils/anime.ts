import type { EpisodeList } from "@/types/anime/anilist";
import { useMemo } from "react";

export const getCurrentEpisode = (
	episodes: EpisodeList[],
	currentEpisodeId: string,
) => {
	const activeEpisode = useMemo(() => {
		return episodes.find(
			(episode) => episode.id.split("=").pop() === currentEpisodeId,
		);
	}, [episodes, currentEpisodeId]);
	return activeEpisode;
};
