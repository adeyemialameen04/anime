import { getHomePage } from "@/queries/anime/home";
import HeroCarousel from "./_components/hero-carousel";
import type { SpotlightAnime } from "@/types/anime";

export default async function Home() {
	const homePage = await getHomePage();

	return (
		<main className="">
			<HeroCarousel
				spotlight={homePage?.data.spotlightAnimes as SpotlightAnime[]}
			/>
		</main>
	);
}
