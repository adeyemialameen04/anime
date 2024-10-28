import type { Metadata } from "next";
import EpisodesSidebar from "./_components/sidebar";
import { getAnilistAnimeDetails } from "@/queries/anime/[id]";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default async function WatchAnimeLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { id: string };
}) {
	const { id } = await params;

	const animeDetails = await getAnilistAnimeDetails(id);
	if (!animeDetails) {
		notFound();
	}

	return (
		<>
			<EpisodesSidebar
				episodes={animeDetails.data.episodesList}
				anime={animeDetails.data}
			>
				{children}
			</EpisodesSidebar>
		</>
	);
}
