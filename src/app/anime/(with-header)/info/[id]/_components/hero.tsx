import { Button } from "@/components/ui/button";
import { LucideImage, Play } from "lucide-react";
import Image from "next/image";
import TruncatedDescription from "./truncated-description";
import Link from "next/link";
import { slugify } from "@/lib/helpers/slugify";
import { Badge } from "@/components/ui/badge";
import { defaultCovers } from "@/data/cover";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import changeImageSize from "@/lib/helpers/sizes";
import AddToList, {
	type WatchistResponse,
} from "@/_components/shared/add-to-list";
import type { JoinedAnime } from "@/app/anime/dal";
import Watch from "./watch";
import { cookies } from "next/headers";

export default async function Hero({
	anime,
	watchListItem,
}: {
	anime: JoinedAnime;
	watchListItem: WatchistResponse;
}) {
	const anilist = anime?.anilist;
	const hianime = anime?.hianime;
	const random = Math.floor(Math.random() * 5);
	return (
		<div className="relative">
			<div className="h-[40dvh] md:h-[30dvh] w-full overflow-hidden border bg-muted shadow md:rounded-lg lg:h-[55dvh]">
				<div
					style={{
						// backgroundImage: `url(${changeImageSize(anime.anime.info.poster)})`,
						backgroundImage: `url(${anilist?.bannerImage ? anilist?.bannerImage : defaultCovers[random]})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
					className="h-full w-full brightness-50"
					data-testid="banner"
				/>
			</div>
			<div className="container relative mx-auto">
				<div className="mx-auto max-w-4xl space-y-8 p-4 md:space-y-12 md:p-0">
					<main className="flex flex-col gap-4 md:flex-row">
						<aside className="transform -translate-y-24 md:-translate-y-32 w-full space-y-2 md:w-1/3">
							<div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border bg-muted shadow">
								{anilist?.coverImage ? (
									<Image
										alt={`Poster for ${hianime.anime.info.name || "anime"}`}
										fill
										className="object-cover"
										loading="lazy"
										sizes="(max-width: 768px) 100vw, 33vw"
										// src={changeImageSize(animeInfo.poster)}
										src={
											anilist?.coverImage?.extraLarge ||
											anilist?.coverImage?.large
										}
									/>
									// biome-ignore lint/nursery/noNestedTernary: <explanation>
								) : hianime.anime.info.poster ? (
									<Image
										alt={`Poster for ${hianime.anime.info.name || "anime"}`}
										fill
										className="object-cover"
										loading="lazy"
										sizes="(max-width: 768px) 100vw, 33vw"
										src={changeImageSize(hianime?.anime?.info?.poster)}
									/>
								) : (
									<div className="flex h-full items-center justify-center">
										<LucideImage size={24} />
									</div>
								)}
							</div>
							{anilist?.trailer && (
								<a
									href={
										anilist.trailer.site === "youtube"
											? `https://www.youtube.com/watch?v=${anilist.trailer.id}`
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
								<Watch
									id={hianime.anime.info.id as string}
									firstEpisodeId={anime.episodes[0].episodeId}
								/>
								<AddToList
									mediaDetails={{
										mediaId: hianime.anime.info.id as string,
										poster: hianime.anime.info.poster as string,
										title: hianime.anime.info.name as string,
										type: "anime",
										episodes: hianime.anime.info.stats.episodes.sub as number,
										duration: Number(
											hianime.anime.info.stats.duration?.slice(0, -1),
										) as number,
									}}
									watchListItem={watchListItem}
								/>
							</div>

							<div className="flex gap-3 flex-wrap">
								{hianime.anime.moreInfo.genres.map((genre: string) => (
									<Link href={`/anime/genre/${slugify(genre)}`} key={genre}>
										<Badge variant={"outline"}>{genre}</Badge>
									</Link>
								))}
								<Badge>
									{hianime.anime.moreInfo.status.toLowerCase() ===
									"currently airing"
										? "Ongoing"
										: "Completed"}
								</Badge>
								{hianime.anime.info.stats.episodes && (
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Badge variant={"secondary"}>
													{hianime.anime.info.stats.episodes.sub}
												</Badge>
											</TooltipTrigger>
											<TooltipContent>
												<p>Episodes</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								)}
								<Badge>{hianime.anime.info.stats.type}</Badge>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Badge variant={"outline"}>
												{hianime.anime.moreInfo.studios}
											</Badge>
										</TooltipTrigger>
										<TooltipContent>
											<p>Studios</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<h3 className="text-2xl font-semibold font-space-grotesk">
								{anilist?.title?.english ||
									anilist?.title?.romaji ||
									anilist?.title?.userPreferred ||
									hianime.anime.info.name}
							</h3>
							<TruncatedDescription
								CHAR_LIMIT={400}
								text={
									anilist?.format === "MANGA" || !anilist?.description
										? (hianime.anime.info.description as string)
										: anilist.description
								}
							/>
						</article>
					</main>
				</div>
			</div>
		</div>
	);
}
