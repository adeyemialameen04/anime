import makeFetch from "@/lib/helpers/fetch";
import type { IAnimeResult, ISearch } from "@/types/anime/gogoanime";
import type { ScrapedHomePage } from "@/types/anime/hianime";
import type { SuccessResponse } from "@/types/api";

export async function getHomePage(): Promise<
	SuccessResponse<ScrapedHomePage> | undefined
> {
	const fetchHomePage = makeFetch<SuccessResponse<ScrapedHomePage>>(
		"aniwatch",
		"/hianime/home",
		null,
		{
			next: {
				revalidate: 3600,
			},
		},
	);

	try {
		return await fetchHomePage();
	} catch (err) {
		console.error("Error fetching home page:", err);
		return undefined;
	}
}

export async function getTrendingAnimes() {
	const fetchTrending = makeFetch<SuccessResponse<ISearch<IAnimeResult>>>(
		"aniwatch",
		"/anilist/trending",
		null,
		{
			next: {
				revalidate: 0,
			},
		},
	);

	try {
		return await fetchTrending();
	} catch (err) {
		console.error("Error fetching home page:", err);
		return undefined;
	}
}
