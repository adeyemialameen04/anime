import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, Card } from "@/components/ui/card";
import changeImageSize, { changeImageSizeSm } from "@/lib/helpers/sizes";
import truncateText from "@/lib/helpers/truncate";
import Image from "next/image";
import Link from "next/link";

export default function AnimeCard({
	anime,
	sm = false,
}: { anime: any; sm: boolean }) {
	return (
		<Link href={`/anime/info/${anime.id}`}>
			<Card className="relative h-[200px] overflow-hidden">
				<Image
					src={
						sm
							? changeImageSizeSm(anime.poster as string)
							: changeImageSize(anime.poster as string)
					}
					alt={anime.name}
					className="object-cover"
					fill
				/>
				{/* <Badge className="absolute right-0">{anime.format}</Badge> */}
				<CardContent className="gradient_text text-white p-0">
					<CardHeader className="p-4 font-space-grotesk flex items-center justify-between flex-row font-semibold">
						{truncateText(anime.name, { maxLength: 25 })}
						{anime.episodes && (
							<Badge variant={"default"}>{anime.episodes.sub}</Badge>
						)}
					</CardHeader>
				</CardContent>
			</Card>
		</Link>
	);
}
