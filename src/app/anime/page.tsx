import { getHomePage, getTrendingAnimes } from "@/queries/anime";
import HeroCarousel from "./_components/hero-carousel";
import type { LatestEpisodeAnime, SpotlightAnime } from "@/types/anime/hianime";
import AnimeTabs from "./_components/anime-tabs";
import type { IAnimeResult } from "@/types/anime/gogoanime";

export default async function Home() {
	const homePage = await getHomePage();
	const trending = await getTrendingAnimes();

	return (
		<main className="">
			<HeroCarousel
				spotlight={homePage?.data.spotlightAnimes as SpotlightAnime[]}
			/>
			<AnimeTabs
				trending={trending?.data.results as IAnimeResult[]}
				latest_episodes={
					homePage?.data.latestEpisodeAnimes as LatestEpisodeAnime[]
				}
			/>
		</main>
	);
}
