import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { WatchList } from "@/types/unwind/user";
import Image from "next/image";
import changeImageSize from "@/lib/helpers/sizes";
import { LucideImage } from "lucide-react";
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
		<Card className="shadow-none">
			<div className="relative aspect-[2/3] w-full overflow-hidden border bg-muted">
				{media.poster ? (
					<Image
						alt={`Poster for ${media.poster || "anime"}`}
						fill
						className="object-cover"
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
			<CardHeader className="flex flex-col ">
				<CardTitle className="font-space-grotesk">{media.title}</CardTitle>
				<div>
					<span className=""></span>
				</div>
			</CardHeader>
		</Card>
	);
};
