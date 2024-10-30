// import type { IAnimeInfo } from "@/types/anime/gogoanime";
import { notFound } from "next/navigation";
import Hero from "./_components/hero";
import AnimeDetailsTab from "./_components/details";
import Back from "./_components/back";
import { getAnilistAnimeDetails } from "../dal";
import axios from "axios";
// import type { SuccessResponse } from "@/types/api";
// import type { ScrapedAnimeAboutInfo } from "@/types/anime/hianime";

async function fetchAnifyEpisodes(id) {
	try {
		const { data } = await axios.get(
			`https://api.anify.tv/info/${id}?fields=[episodes]`,
		);

		const epdata = data.episodes.data;
		if (!data) {
			return [];
		}

		const filtereddata = epdata.filter(
			(episodes) => episodes.providerId !== "9anime",
		);
		return filtereddata;
	} catch (error) {
		console.error("Error fetching and processing anify:", error.message);
		return [];
	}
}

export default async function AnimeDetail({
	params,
	searchParams,
}: { params: { id: string }; searchParams: { page?: string } }) {
	const { id } = await params;
	const { page } = await searchParams;
	const lol = await fetchAnifyEpisodes(id);
	console.log(lol);

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
			<Back />
			<Hero anime={animeDetails?.data} />
			<AnimeDetailsTab anime={animeDetails?.data} page={Number(page || "1")} />
		</main>
	);
}
