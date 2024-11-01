import { getHomePage, getTrendingAnimes } from "@/queries/anime";
import HeroCarousel from "./_components/hero-carousel";
import type { LatestEpisodeAnime, SpotlightAnime } from "@/types/anime/hianime";
import AnimeTabs from "./_components/anime-tabs";
import type { IAnimeResult } from "@/types/anime/gogoanime";
import { getTop100 } from "./dal";

export default async function Home() {
	const homePage = await getHomePage();
	const top100Anime = await getTop100();
	const trending = await getTrendingAnimes();

	return (
		<main className="">
			<HeroCarousel
				spotlight={homePage?.data.spotlightAnimes as SpotlightAnime[]}
				// animes={top100Anime?.data}
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
