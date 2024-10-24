"use client";
import type { SpotlightAnime } from "@/types/anime/hianime";
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
						stopOnMouseEnter: true,
					}),
				]}
				opts={{
					align: "start",
					loop: true,
				}}
			>
				<CarouselContent>
					{spotlight.map((anime) => (
						<CarouselItem key={anime.id} className="overflow-hidden">
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
