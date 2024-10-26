import makeFetch from "@/lib/helpers/fetch";
import type { AnilistAnime, Sourcedata } from "@/types/anime/anilist";
import type { ScrapedAnimeAboutInfo } from "@/types/anime/hianime";
import type { SuccessResponse } from "@/types/api";

export async function getAnilistAnimeDetails(id: string) {
	const fetchAnimeDetails = makeFetch<SuccessResponse<AnilistAnime>>(
		"aniwatch",
		`/anilist/anime/${id}`,
		null,
		{
			next: {
				revalidate: 0,
			},
		},
	);

	try {
		return await fetchAnimeDetails();
	} catch (err) {
		console.error("Error fetching home page:", err);
		return undefined;
	}
}

export async function getAniwatchAnimeDetails(id: string) {
	const fetchAnimeDetails = makeFetch<SuccessResponse<ScrapedAnimeAboutInfo>>(
		"aniwatch",
		`/hianime/browse/anime/${id}`,
		null,
		{
			next: {
				revalidate: 3600,
			},
		},
	);

	try {
		return await fetchAnimeDetails();
	} catch (err) {
		console.error("Error fetching home page:", err);
		return undefined;
	}
}

export async function getAnilistEpisodeSources(epId: string, serverId: string) {
	const fetchEpisodeServers = makeFetch<SuccessResponse<Sourcedata>>(
		"aniwatch",
		`/anilist/anime/sources?serverId=${serverId}&episodeId=${epId}`,
		null,
	);
	try {
		return await fetchEpisodeServers();
	} catch (err) {
		console.error("Error fetching servers", err);
		return undefined;
	}
}

export async function getAnilistEpisodeServers(epId: string) {
	const fetchEpisodeServers = makeFetch(
		"aniwatch",
		`/anilist/anime/servers/${epId}`,
		null,
	);
	try {
		return await fetchEpisodeServers();
	} catch (err) {
		console.error("Error fetching servers", err);
		return undefined;
	}
}
