import makeFetch from "@/lib/helpers/fetch";
import { EpisodeList } from "@/types/anime/anilist";
import { SuccessResponse } from "@/types/api";

export async function getEpisodesList(id: string) {
	const fetchEpisodesList = makeFetch<SuccessResponse<EpisodeList[]>>(
		"aniwatch",
		`/anilist/anime/episodes/${id}?subOrDub=sub`,
		null,
		{
			next: {
				revalidate: 0,
			},
		},
	);

	try {
		return await fetchEpisodesList();
	} catch (err) {
		console.error("Error fetching episodes list:", err);
		return undefined;
	}
}
