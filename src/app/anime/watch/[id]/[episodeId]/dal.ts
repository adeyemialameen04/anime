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
export type Source = {
	url: string;
	isM3U8: boolean;
	quality: string;
};

export type EpisodeSource = {
	headers: {
		Referer: string;
	};
	sources: Source[];
	download: string;
};

export async function getEpisodeSources(id: string) {
	const fetchEpisodesList = makeFetch<SuccessResponse<EpisodeSource>>(
		"aniwatch",
		`/anilist/anime/sources/${id}`,
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

export type EpisodeServer = {
	name: string;
	url: string;
};

export async function getEpisodeServers(id: string) {
	const fetchEpisodesList = makeFetch<SuccessResponse<EpisodeServer[]>>(
		"aniwatch",
		`/anilist/anime/servers/${id}`,
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
