import changeImageSize from "@/lib/helpers/sizes";
import { cn } from "@/lib/utils";
import { IAnimeInfo } from "@/types/anime/gogoanime";
import { ScrapedAnimeAboutInfo } from "@/types/anime/hianime";
import { url } from "inspector";
import { LucideImage } from "lucide-react";
import Image from "next/image";

export default function Hero({
	anime,
}: {
	anime: IAnimeInfo | ScrapedAnimeAboutInfo;
}) {
	const animeInfo = anime.anime.info;

	return (
		<div className="relative">
			{/* Banner Container */}
			<div className="h-[40dvh] md:h-[30dvh] w-full overflow-hidden border bg-muted shadow md:rounded-lg lg:h-[55dvh]">
				<div
					style={{
						backgroundImage: `url(${changeImageSize(anime.anime.info.poster)})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
					className="h-full w-full brightness-75"
					data-testid="banner"
				/>
			</div>

			{/* Content Container - Moved outside banner container */}
			<div className="container relative mx-auto">
				<div className="mx-auto max-w-4xl space-y-8 p-4 md:space-y-12 md:p-0">
					<main className="flex flex-col gap-4 md:flex-row">
						<aside className="transform -translate-y-24 md:-translate-y-32 w-full space-y-2 md:w-1/3">
							<div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border bg-muted shadow">
								{animeInfo.poster ? (
									<Image
										alt={`Poster for ${animeInfo.title || "anime"}`}
										fill
										className="object-cover"
										loading="lazy"
										sizes="(max-width: 768px) 100vw, 33vw"
										src={changeImageSize(animeInfo.poster)}
									/>
								) : (
									<div className="flex h-full items-center justify-center">
										<LucideImage size={24} />
									</div>
								)}
							</div>
						</aside>
					</main>
				</div>
			</div>
		</div>
	);
}
