import { getHomePage } from "@/queries/anime";
import HeroCarousel from "./_components/hero-carousel";
import type {
	LatestEpisodeAnime,
	SpotlightAnime,
	TrendingAnime,
} from "@/types/anime/hianime";
import AnimeTabs from "./_components/anime-tabs";

export default async function Home() {
	const homePage = await getHomePage();
	// const top100Anime = await getTop100();
	// const trending = await getTrendingAnimes();

	return (
		<main className="">
			<HeroCarousel
				spotlight={homePage?.data.spotlightAnimes as SpotlightAnime[]}
				// animes={top100Anime?.data}
			/>
			<AnimeTabs
				trending={homePage?.data.trendingAnimes as TrendingAnime[]}
				latest_episodes={
					homePage?.data.latestEpisodeAnimes as LatestEpisodeAnime[]
				}
			/>
		</main>
	);
}
