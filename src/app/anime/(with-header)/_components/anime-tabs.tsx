import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IAnimeResult } from "@/types/anime/gogoanime";
import type { LatestEpisodeAnime, TrendingAnime } from "@/types/anime/hianime";
import Trending from "./trending";
import LatestEpisodes from "./latest-episodes";

export default function AnimeTabs({
	trending,
	latest_episodes,
}: { trending: TrendingAnime[]; latest_episodes: LatestEpisodeAnime[] }) {
	const tabs = [
		{ title: "Trending", data: trending },
		{ title: "Latest Episodes", data: latest_episodes },
	];
	return (
		<Tabs className="container" defaultValue={tabs[1].title.toLowerCase()}>
			<TabsList>
				{tabs.map((tab) => (
					<TabsTrigger key={tab.title} value={tab.title.toLowerCase()}>
						{tab.title}
					</TabsTrigger>
				))}
			</TabsList>
			<Trending trending={trending} />
			<LatestEpisodes latest_episodes={latest_episodes} />
		</Tabs>
	);
}
