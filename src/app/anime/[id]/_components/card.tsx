import { Badge } from "@/components/ui/badge";
import {
	CardContent,
	CardHeader,
	CardDescription,
	Card,
} from "@/components/ui/card";
import truncateText from "@/lib/helpers/truncate";
import Image from "next/image";
import Link from "next/link";

export default function AnimeCard({ anime }: { anime: any }) {
	return (
		<Link href={`/anime/${anime.id}`}>
			<Card className="relative h-[200px] overflow-hidden">
				<Image
					src={anime.coverImage.extraLarge as string}
					alt={anime.title.userPreferred}
					className="object-cover"
					fill
				/>
				<Badge className="absolute right-0">{anime.format}</Badge>
				<CardContent className="gradient_text text-white p-0">
					<CardHeader className="p-4 font-space-grotesk flex items-center justify-between flex-row font-semibold">
						{truncateText(anime.title.userPreferred, { maxLength: 25 })}
						{anime.meanScore && (
							<Badge variant={"default"}>{anime.meanScore / 10}</Badge>
						)}
					</CardHeader>
				</CardContent>
			</Card>
		</Link>
	);
}
