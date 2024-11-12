// import type { IAnimeInfo } from "@/types/anime/gogoanime";
import { notFound } from "next/navigation";
import Hero from "./_components/hero";
import AnimeDetailsTab from "./_components/details";
import Back from "./_components/back";
import { getHiAnimeDetails } from "@/app/anime/dal";
import logServer from "@/lib/helpers";
import { getInWatchList } from "@/queries/unwind/user";

export default async function AnimeDetail({
	params,
}: { params: { id: string }; searchParams: { page?: string } }) {
	const { id } = await params;
	const [animeDetails, watchListItem] = await Promise.all([
		getHiAnimeDetails(id),
		getInWatchList(id),
	]);

	if (!animeDetails) {
		notFound();
	}

	logServer(animeDetails.data.anilist.id);

	return (
		<main className="md:container py-4">
			<Back />
			<Hero watchListItem={watchListItem} anime={animeDetails?.data} />
			<AnimeDetailsTab anime={animeDetails?.data} />
		</main>
	);
}
