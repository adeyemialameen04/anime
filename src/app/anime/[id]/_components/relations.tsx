import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import truncateText from "@/lib/helpers/truncate";
import type { AnilistAnime } from "@/types/anime/anilist";
import Image from "next/image";
import Link from "next/link";

export default async function Relations({ anime }: { anime: AnilistAnime }) {
	const relations = anime.relations;
	console.log(relations);
	return (
		<TabsContent
			value="relations"
			className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4"
		>
			{relations.map((anime) => (
				<Link key={anime.id} href={`/anime/${anime.id}`}>
					<Card className="relative h-[200px] overflow-hidden">
						<Image
							src={anime.coverImage.extraLarge as string}
							alt={anime.title.userPreferred}
							className="object-cover"
							fill
						/>
						<Badge className="absolute right-0">{anime.format}</Badge>
						<CardContent className="gradient_text text-white p-0">
							<CardHeader className="p-4 font-space-grotesk font-semibold">
								{truncateText(anime.title.userPreferred, { maxLength: 25 })}
								<CardDescription>{anime.meanScore / 10}</CardDescription>
							</CardHeader>
						</CardContent>
					</Card>
				</Link>
			))}
		</TabsContent>
	);
}
