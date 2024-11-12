import AddToList from "@/_components/shared/add-to-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import changeImageSize from "@/lib/helpers/sizes";
import truncateText from "@/lib/helpers/truncate";
import { getInWatchList } from "@/queries/unwind/user";
import type { SpotlightAnime } from "@/types/anime/hianime";
import { Play, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroItem({ anime }: { anime: SpotlightAnime }) {
	// const watchListItem = await getInWatchList(anime.id as string);
	function changeImageSize(url: string): string {
		const newUrl = url.replace(
			"https://cdn.noitatnemucod.net/thumbnail/1366x768",
			"https://cdn.noitatnemucod.net/thumbnail/1866x1080",
		);
		return newUrl;
	}

	return (
		<div className="md:rounded-xl relative h-[600px] w-full overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
			<div className="absolute inset-0">
				<Image
					src={changeImageSize(anime.poster as string)}
					alt="Anime Cover"
					fill
					priority
					className="object-cover"
					sizes="100vw"
					quality={100}
				/>
			</div>

			<div className="relative z-20 h-full flex flex-col justify-end py-14 px-6 md:px-8 max-w-3xl">
				<span className="text-yellow-400 font-medium mb-2">
					{/* #{anime.rank} Spotlight */}
				</span>

				{/* Title */}
				<h1 className="text-2xl md:text-4xl font-space-grotesk font-bold text-white mb-4">
					{anime.name}
				</h1>

				<div className="flex items-center gap-4 text-gray-300 text-sm mb-4">
					<span className="flex items-center">
						<span className="mr-2">{anime.otherInfo[0]}</span>
					</span>
					<span>{anime.otherInfo[1]}</span>
					<span>{anime.otherInfo[2]}</span>
					<Badge className="bg-green-600/20 text-green-400">
						{anime.otherInfo[3]}
					</Badge>
				</div>

				{/* Description */}
				<p className="text-gray-300 mb-6 max-w-2xl truncate text-wrap">
					{truncateText(anime.description as string, {
						maxLength: 200,
						breakOnWord: false,
					})}
				</p>

				{/* Action Buttons */}
				<div className="flex flex-col md:flex-row gap-4">
					<Button className="rounded-full max-w-[200px]" asChild>
						<Link href={`/anime/info/${anime.id}`}>
							<Play className="w-4 h-4 mr-2" />
							Watch Now
						</Link>
					</Button>
					{/* <AddToList */}
					{/* 	mediaDetails={{ */}
					{/* 		mediaId: anime.id as string, */}
					{/* 		poster: anime.poster as string, */}
					{/* 		title: anime.name ?? (anime.jname as string), */}
					{/* 		type: "anime", */}
					{/* 		episodes: anime.episodes.sub as number, */}
					{/* 		duration: Number(anime.otherInfo[1].slice(0, -1)) as number, */}
					{/* 	}} */}
					{/* 	watchListItem={watchListItem} */}
					{/* /> */}
				</div>
			</div>
		</div>
	);
}
