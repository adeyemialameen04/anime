import makeFetch from "@/lib/helpers/fetch";
import type { EpisodeList } from "@/types/anime/anilist";
import type { SuccessResponse } from "@/types/anime/api";

type PaginatedRes = {
	episodes: EpisodeList[];
	page: number;
	total: number;
	hasNextPage: boolean;
	perPage: number;
};

export async function getAnimeEpisodes(
	id: string,
	page: string,
	perPage: string,
) {
	const fetchAnimeDetails = makeFetch<SuccessResponse<PaginatedRes>>(
		"aniwatch",
		`/anilist/anime/episodes/${id}?page=${page}&perPage=${perPage}`,
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
