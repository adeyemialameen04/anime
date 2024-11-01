import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AnilistAnime } from "@/types/anime/anilist";
import AnimeCard from "./card";
import { cn } from "@/lib/utils";

export default async function AnimeDetailsTab({
	anime,
}: { anime: AnilistAnime; page: number }) {
	const anilist = anime.anilist;
	const hianime = anime.hianime;
	const tabs = [
		{
			title: "seasons",
			data: hianime.seasons,
			sm: true,
		},
		{
			title: "related",
			data: hianime.relatedAnimes,
			sm: false,
		},
		{
			title: "recommendations",
			data: hianime.recommendedAnimes,
			sm: false,
		},
	];
	console.log(tabs[0].data);

	return (
		<Tabs
			defaultValue={tabs[0].data.length > 0 ? tabs[0].title : tabs[1].title}
			className="max-w-5xl container"
		>
			<TabsList className="flex-wrap h-auto">
				{tabs.map((tab) => (
					<TabsTrigger
						value={tab.title}
						key={tab.title}
						className={cn("capitalize", tab.data.length === 0 && "hidden")}
					>
						{tab.title}
					</TabsTrigger>
				))}
			</TabsList>
			{tabs.map((tab) => (
				<TabsContent
					value={tab.title}
					key={tab.title}
					className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4"
				>
					{[
						...new Map(tab.data.map((anime) => [anime.id, anime])).values(),
					].map((anime, index) => (
						<AnimeCard anime={anime} key={`${anime.id}-${index}`} sm={tab.sm} />
					))}
				</TabsContent>
			))}
		</Tabs>
	);
}
