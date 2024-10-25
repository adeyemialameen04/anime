// import { TabsContent } from "@/components/ui/tabs";
// import type { EpisodeList } from "@/types/anime/anilist";
// import EpisodesPagination from "./pagination";
// import { getAnimeEpisodes } from "@/queries/anime/episodes/[id]";
// import logServer from "@/lib/helpers";
// import useSWRInfinite from 'swr/infinite'
//
// const getKey = (pageIndex, previousPageData) => {
//   // reached the end
//   if (previousPageData && !previousPageData.data) return null
//
//   // first page, we don't have `previousPageData`
//   if (pageIndex === 0) return `/users?limit=10`
//
//   // add the cursor to the API endpoint
//   return `/users?cursor=${previousPageData.nextCursor}&limit=10`
// }
//
// export default async function EpisodesTab({
// 	page,
// 	id,
// }: { page: number; id: number }) {
// const {} = useSWRInfinite()
//
// 	// const data = await getAnimeEpisodes(id.toString(), page.toString(), "10");
// 	// logServer(data?.data.episodes);
//
// 	return (
// 		<TabsContent value="episodes">
// 			{/* {data?.data?.episodes.slice(0, 10).map((episode) => ( */}
// 			{/* 	<div key={episode.id}>{episode.title}</div> */}
// 			{/* ))} */}
// 			{/* <EpisodesPagination */}
// 			{/* 	page={page} */}
// 			{/* 	id={id} */}
// 			{/* 	totalPages={Math.ceil(data?.data.total / data?.data.perPage)} */}
// 			{/* /> */}
// 		</TabsContent>
// 	);
// }
//
//

"use client";
import { useInfiniteAnimeEpisodes } from "@/hooks/use-infinite-scrolling-episodes";
import { Skeleton } from "@/components/ui/skeleton";
import InfiniteScrollContainer from "@/_components/infinite-scroll-container";
import type { EpisodeList } from "@/types/anime/anilist";

export default function EpisodesTab({ id }: { id: number }) {
	const {
		episodes,
		error,
		isLoadingMore,
		isReachingEnd,
		isEmpty,
		loadMore,
		isRefreshing,
		hasNextPage,
	} = useInfiniteAnimeEpisodes(id);

	if (error) {
		console.error(error);
		return (
			<div className="text-center text-red-500">Failed to load episodes</div>
		);
	}

	if (isEmpty) return <div className="text-center">No episodes found</div>;

	return (
		<div className="space-y-4">
			<InfiniteScrollContainer
				onBottomReached={loadMore}
				isLoading={isLoadingMore}
				hasNextPage={hasNextPage}
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
			>
				{episodes.map((episode: EpisodeList) => (
					<div key={episode.id} className="p-4 border rounded-md shadow-sm">
						<h3 className="text-lg font-semibold">{episode.title}</h3>
						{/* Add more episode details here */}
					</div>
				))}
				{isLoadingMore && (
					<div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
						{Array.from({ length: 8 }).map((_, index) => (
							<EpisodeSkeleton
								key={`loading-${
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									index
								}`}
							/>
						))}
					</div>
				)}
			</InfiniteScrollContainer>
		</div>
	);
}

function EpisodeSkeleton() {
	return (
		<div className="p-4 border rounded-md shadow-sm space-y-2">
			<Skeleton className="h-6 w-3/4" />
			<Skeleton className="h-4 w-1/2" />
		</div>
	);
}
