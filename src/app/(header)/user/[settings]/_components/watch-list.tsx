import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { WatchList } from "@/types/unwind/user";
import Image from "next/image";
import changeImageSize from "@/lib/helpers/sizes";
import { LucideImage } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function WatchListGrid({
	watchlist,
}: { watchlist: WatchList[] }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
			{watchlist.map((item) => (
				<WatchListItem media={item} key={item.id} />
			))}
		</div>
	);
}

const WatchListItem = ({ media }: { media: WatchList }) => {
	console.log(media);
	return (
		<Card className="shadow-none rounded-lg">
			<div className="relative aspect-square h-fit w-full overflow-hidden">
				{media.poster ? (
					<Image
						alt={`Poster for ${media.poster || "anime"}`}
						fill
						className="object-cover max-h-[300px]"
						loading="lazy"
						sizes="(max-width: 768px) 100vw, 33vw"
						src={changeImageSize(media.poster)}
					/>
				) : (
					<div className="flex h-full items-center justify-center">
						<LucideImage size={24} />
					</div>
				)}
			</div>
			<CardHeader className="flex justify-between flex-row items-center">
				<CardTitle className="font-space-grotesk">
					<Button variant={"link"} asChild className="p-0">
						<Link
							href={
								media.type === "anime" ? `/anime/info/${media.mediaId}` : ""
							}
						>
							{media.title}
						</Link>
					</Button>
				</CardTitle>
				<div className="capitalize flex gap-2 items-center">
					<Badge>{media.mediaType}</Badge>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Badge variant={"secondary"}>{media.episodes}</Badge>
							</TooltipTrigger>
							<TooltipContent>
								<p>Episodes</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</CardHeader>
		</Card>
	);
};
