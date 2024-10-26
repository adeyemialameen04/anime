import { getAnilistAnimeDetails } from "@/queries/anime/[id]";
import { notFound } from "next/navigation";
import EpisodesSidebar from "./_components/sidebar";

export default async function AnimeDetail({
	params,
}: { params: { id: string }; searchParams: { page?: string } }) {
	const { id } = await params;

	const animeDetails = await getAnilistAnimeDetails(id);
	if (!animeDetails) {
		notFound();
	}
	console.log(animeDetails.data.episodesList);

	return (
		<main className="md:container py-4">
			<EpisodesSidebar
				episodes={animeDetails.data.episodesList}
				id={animeDetails.data.id.toString()}
			/>
		</main>
	);
}
