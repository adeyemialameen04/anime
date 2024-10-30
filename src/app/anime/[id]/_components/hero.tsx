import { Button } from "@/components/ui/button";
import type { AnilistAnime } from "@/types/anime/anilist";
import { LucideImage, Play, PlusCircle } from "lucide-react";
import Image from "next/image";
import TruncatedDescription from "./truncated-description";
import Link from "next/link";
import { slugify } from "@/lib/helpers/slugify";
import { Badge } from "@/components/ui/badge";

export default function Hero({
	anime,
}: {
	anime: AnilistAnime;
}) {
	return (
		<div className="relative">
			<div className="h-[40dvh] md:h-[30dvh] w-full overflow-hidden border bg-muted shadow md:rounded-lg lg:h-[55dvh]">
				<div
					style={{
						// backgroundImage: `url(${changeImageSize(anime.anime.info.poster)})`,
						backgroundImage: `url(${anime.bannerImage})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
					className="h-full w-full brightness-50"
					data-testid="banner"
				/>
			</div>
			{/* Content Container - Moved outside banner container */}
			<div className="container relative mx-auto">
				<div className="mx-auto max-w-4xl space-y-8 p-4 md:space-y-12 md:p-0">
					<main className="flex flex-col gap-4 md:flex-row">
						<aside className="transform -translate-y-24 md:-translate-y-32 w-full space-y-2 md:w-1/3">
							<div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border bg-muted shadow">
								{anime.coverImage ? (
									<Image
										alt={`Poster for ${anime.title || "anime"}`}
										fill
										className="object-cover"
										loading="lazy"
										sizes="(max-width: 768px) 100vw, 33vw"
										// src={changeImageSize(animeInfo.poster)}
										src={anime.coverImage.extraLarge || anime.coverImage.large}
									/>
								) : (
									<div className="flex h-full items-center justify-center">
										<LucideImage size={24} />
									</div>
								)}
							</div>
							{anime.trailer && (
								<a
									href={
										anime.trailer.site === "youtube"
											? `https://www.youtube.com/watch?v=${anime.trailer.id}`
											: ""
									}
									target="_blank"
									rel="noreferrer"
								>
									<Button className="w-full mt-1">
										<Play className="h-4 w-4 mr-2" /> Watch Trailer
									</Button>
								</a>
							)}
						</aside>

						<article className="flex w-full flex-col gap-3 pt-3 md:w-2/3">
							<div className="flex gap-3">
								{anime.episodesList && (
									<Link
										href={`/anime/watch/${anime.id}?ep=${anime.episodesList[0].episodeId}`}
									>
										<Button className="max-w-40">
											<Play className="h-4 w-4" /> Watch
										</Button>
									</Link>
								)}

								<Button variant={"outline"}>
									<PlusCircle className="h-4 w-4" />
									Add to List
								</Button>
							</div>

							<div className="flex gap-3 flex-wrap">
								{anime.genres.map((genre) => (
									<Link href={`/anime/genre/${slugify(genre)}`} key={genre}>
										<Badge variant={"outline"}>{genre}</Badge>
									</Link>
								))}
								<Badge>
									{anime.status.toLowerCase() === "releasing"
										? "Ongoing"
										: "Completed"}
								</Badge>
								{anime.episodes && (
									<Badge variant={"secondary"}>{anime.episodes}</Badge>
								)}
								<Badge>{anime.format}</Badge>
							</div>
							<h3 className="text-2xl font-semibold font-space-grotesk">
								{anime.title.english || anime.title.romaji}
							</h3>
							<TruncatedDescription CHAR_LIMIT={400} text={anime.description} />
						</article>
					</main>
				</div>
			</div>
		</div>
	);
}
