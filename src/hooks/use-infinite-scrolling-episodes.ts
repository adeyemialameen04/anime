import { ANIWATCH_API_BASE_URL } from "@/lib/constants";
import useSWRInfinite from "swr/infinite";

const getKey = (pageIndex: number, previousPageData: any, animeId: number) => {
	if (previousPageData && !previousPageData.data.episodes.length) return null;
	return `${ANIWATCH_API_BASE_URL}/anilist/anime/episodes/${animeId}?pageIndex=${pageIndex}&limit=10`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useInfiniteAnimeEpisodes(animeId: number) {
	const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite(
		(pageIndex, previousPageData) =>
			getKey(pageIndex, previousPageData, animeId),
		fetcher,
		{
			revalidateFirstPage: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			persistSize: true,
			dedupingInterval: 3600000, // 1 hour
			refreshInterval: 3600000, // 1 hour
			shouldRetryOnError: false,
		},
	);

	const episodes = data ? data.flatMap((page) => page.data.episodes) : [];
	const isLoadingInitialData = !data && !error;
	const isLoadingMore =
		isLoadingInitialData ||
		(size > 0 && data && typeof data[size - 1] === "undefined");
	const isEmpty = data?.[0]?.data.episodes.length === 0;

	const hasNextPage = !isEmpty && !data?.[data.length - 1]?.data.isLastPage;

	const isReachingEnd = isEmpty || data?.[data.length - 1]?.data.isLastPage;
	const isRefreshing = isValidating && data && data.length === size;

	return {
		hasNextPage,
		episodes,
		error,
		isLoadingMore,
		isReachingEnd,
		isEmpty,
		loadMore: () => setSize(size + 1),
		isRefreshing,
		mutate,
	};
}
