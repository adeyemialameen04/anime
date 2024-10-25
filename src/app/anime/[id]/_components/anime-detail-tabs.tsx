import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AnilistAnime } from "@/types/anime/anilist";
import EpisodesTab from "./episodes-tab";

export default async function AnimeDetailsTab({
	anime,
	page,
}: { anime: AnilistAnime; page: number }) {
	const tabs = ["episodes", "relations", "recommendations"];

	return (
		<Tabs defaultValue={tabs[0]} className="max-w-5xl mx-auto">
			<TabsList>
				{tabs.map((tab) => (
					<TabsTrigger value={tab} key={tab} className="capitalize">
						{tab}
					</TabsTrigger>
				))}
			</TabsList>
			<EpisodesTab page={page} episodes={anime.episodesList} id={anime.id} />
		</Tabs>
	);
}
