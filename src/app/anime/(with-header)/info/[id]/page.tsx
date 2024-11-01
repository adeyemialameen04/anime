// import type { IAnimeInfo } from "@/types/anime/gogoanime";
import { notFound } from "next/navigation";
import Hero from "./_components/hero";
import AnimeDetailsTab from "./_components/details";
import Back from "./_components/back";
import { getHiAnimeDetails } from "@/app/anime/dal";

export default async function AnimeDetail({
	params,
	searchParams,
}: { params: { id: string }; searchParams: { page?: string } }) {
	const { id } = await params;
	const { page } = await searchParams;

	const animeDetails = await getHiAnimeDetails(id);

	if (!animeDetails) {
		notFound();
	}

	return (
		<main className="md:container py-4">
			<Back />
			<Hero anime={animeDetails?.data} />
			<AnimeDetailsTab anime={animeDetails?.data} />
		</main>
	);
}
