import makeFetch from "@/lib/helpers/fetch";
import type {
	AnilistAnime,
	BaseAnilistAnime,
	EpisodeList,
} from "@/types/anime/anilist";
import { ScrapedAnimeAboutInfo } from "@/types/anime/hianime";
import type { SuccessResponse } from "@/types/anime/api";
import { IAnimeInfo } from "@consumet/extensions/dist/models";

export async function getAnilistAnimeDetails(id: string) {
	const fetchAnimeDetails = makeFetch<SuccessResponse<AnilistAnime>>(
		"aniwatch",
		`/anilist/anime/info/${id}`,
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

export async function getTop100() {
	const fetchAnimeDetails = makeFetch<SuccessResponse<BaseAnilistAnime>>(
		"aniwatch",
		"/anilist/top?page=1&perPage=10",
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
		console.error("Error fetching top 100:", err);
		return undefined;
	}
}

export type JoinedAnime = {
	hianime: ScrapedAnimeAboutInfo;
	anilist: AnilistAnime;
	episodes: EpisodeList[];
};
export async function getHiAnimeDetails(id: string) {
	const fetchAnimeDetails = makeFetch<SuccessResponse<JoinedAnime>>(
		"aniwatch",
		`/hianime/anime/info/${id}`,
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
