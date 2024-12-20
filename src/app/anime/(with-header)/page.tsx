import { getHomePage } from "@/queries/anime";
import HeroCarousel from "./_components/hero-carousel";
import type {
	LatestEpisodeAnime,
	SpotlightAnime,
	TrendingAnime,
} from "@/types/anime/hianime";
import AnimeTabs from "./_components/anime-tabs";
import { cookies } from "next/headers";

export default async function Home() {
	const cookieStore = await cookies();
	console.log(cookieStore.get("test"));
	const homePage = await getHomePage();

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
