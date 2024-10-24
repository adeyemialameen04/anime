import makeFetch from "@/lib/helpers/fetch";
import type { IAnimeInfo } from "@/types/anime/gogoanime";
import type { ScrapedAnimeAboutInfo } from "@/types/anime/hianime";
import type { SuccessResponse } from "@/types/api";

export async function getAnilistAnimeDetails(id: string) {
	const fetchAnimeDetails = makeFetch<SuccessResponse<IAnimeInfo>>(
		"aniwatch",
		`/anilist/anime/${Number(id)}`,
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