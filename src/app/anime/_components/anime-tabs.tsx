import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IAnimeResult } from "@/types/anime/gogoanime";
import type { LatestEpisodeAnime } from "@/types/anime/hianime";
import Trending from "./trending";
import LatestEpisodes from "./latest-episodes";

export default function AnimeTabs({
	trending,
	latest_episodes,
}: { trending: IAnimeResult[]; latest_episodes: LatestEpisodeAnime[] }) {
	const tabs = [
		{ title: "Trending", data: trending },
		{ title: "Latest Episodes", data: latest_episodes },
	];
	return (
		<Tabs className="container" defaultValue="trending">
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
