"use client";
import type { SpotlightAnime } from "@/types/anime";
import HeroItem from "./hero-item";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function HeroCarousel({
	spotlight,
}: { spotlight: SpotlightAnime[] }) {
	return (
		<div className="py-7 md:container">
			<Carousel
				plugins={[
					Autoplay({
						delay: 4000,
					}),
				]}
				opts={{
					align: "start",
					loop: true,
				}}
			>
				<CarouselContent>
					{spotlight.map((anime) => (
						<CarouselItem key={anime.id}>
							<HeroItem anime={anime} />
						</CarouselItem>
					))}
				</CarouselContent>
				<div className="absolute bottom-11 right-5 flex items-center gap-2">
					<CarouselPrevious className="static opacity-100" />
					<CarouselNext className="static opacity-100" />
				</div>
			</Carousel>
		</div>
	);
}
