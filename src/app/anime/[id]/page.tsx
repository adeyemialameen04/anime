import { getAnilistAnimeDetails } from "@/queries/anime/[id]";
// import type { IAnimeInfo } from "@/types/anime/gogoanime";
import { notFound } from "next/navigation";
import Hero from "./_components/hero";
import AnimeDetailsTab from "./_components/anime-detail-tabs";
// import type { SuccessResponse } from "@/types/api";
// import type { ScrapedAnimeAboutInfo } from "@/types/anime/hianime";

export default async function AnimeDetail({
	params,
	searchParams,
}: { params: { id: string }; searchParams: { page?: string } }) {
	const { id } = await params;
	const { page } = await searchParams;

	const animeDetails = await getAnilistAnimeDetails(id);
	// let animeDetails:
	// 	| SuccessResponse<IAnimeInfo | ScrapedAnimeAboutInfo>
	// 	| undefined;
	// if (!Number.isNaN(Number(id))) {
	// 	animeDetails = await getAnilistAnimeDetails(id);
	// } else {
	// 	animeDetails = await getAniwatchAnimeDetails(id);
	// }

	if (!animeDetails) {
		notFound();
	}

	return (
		<main className="md:container py-4">
			<Hero anime={animeDetails?.data} />
			<AnimeDetailsTab anime={animeDetails?.data} page={Number(page || "1")} />
		</main>
	);
}
