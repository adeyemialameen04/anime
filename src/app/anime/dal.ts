import makeFetch from "@/lib/helpers/fetch";
import type { AnilistAnime, BaseAnilistAnime } from "@/types/anime/anilist";
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
