import Hero from "./_components/hero";
import type { IAnimeInfo } from "@/types/anime/gogoanime";
import { notFound } from "next/navigation";
import {
	getAnilistAnimeDetails,
	getAniwatchAnimeDetails,
} from "@/queries/anime/[id]";
import type { SuccessResponse } from "@/types/api";
import type { ScrapedAnimeAboutInfo } from "@/types/anime/hianime";

export default async function AnimeDetail({
	params,
}: { params: { id: string } }) {
	const { id } = await params;
	let animeDetails:
		| SuccessResponse<IAnimeInfo | ScrapedAnimeAboutInfo>
		| undefined;
	if (!Number.isNaN(Number(id))) {
		animeDetails = await getAnilistAnimeDetails(id);
	} else {
		animeDetails = await getAniwatchAnimeDetails(id);
	}

	if (!animeDetails) {
		notFound();
	}

	return (
		<main className="md:container py-4">
			<Hero anime={animeDetails?.data} />
		</main>
	);
}
