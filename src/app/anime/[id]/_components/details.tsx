import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AnilistAnime } from "@/types/anime/anilist";
import AnimeCard from "./card";

export default async function AnimeDetailsTab({
	anime,
}: { anime: AnilistAnime; page: number }) {
	const tabs = ["relations", "recommendations"];
	const recommendations = anime.recommendations;
	const relations = anime.relations;

	return (
		<Tabs defaultValue={tabs[0]} className="max-w-5xl container">
			<TabsList className="flex-wrap h-auto">
				{tabs.map((tab) => (
					<TabsTrigger value={tab} key={tab} className="capitalize">
						{tab}
					</TabsTrigger>
				))}
			</TabsList>
			<TabsContent
				value="recommendations"
				className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4"
			>
				{recommendations.map((anime, index) => (
					<AnimeCard anime={anime} key={`${anime.id}-${index}`} />
				))}
			</TabsContent>
			<TabsContent
				value="relations"
				className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4"
			>
				{relations.map((anime) => (
					<AnimeCard anime={anime} key={anime.id} />
				))}
			</TabsContent>
		</Tabs>
	);
}
