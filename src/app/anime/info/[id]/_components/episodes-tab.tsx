import { Skeleton } from "@/components/ui/skeleton";
import type { EpisodeList } from "@/types/anime/anilist";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";
import Gogoanime from "@consumet/extensions/dist/providers/anime/gogoanime";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";
import Image from "next/image";
import logServer from "@/lib/helpers";

export default async function EpisodesTab({
	id,
	episodes,
}: { id: number; episodes: EpisodeList[] }) {
	const anilist = new Anilist(new Gogoanime());
	// const data = await anilist.fetchEpisodesListById(id.toString());

	return (
		<TabsContent value={"episodes"} className="mt-4">
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
				{data.map((episode) => (
					<Card key={episode.id} className="border-none">
						<CardHeader className="border">
							<div className="relative">
								<Image className="" alt="" src={episode.image as string} fill />
								{episode.title}
							</div>
						</CardHeader>
					</Card>
				))}
			</div>
		</TabsContent>
	);
}

function EpisodeSkeleton() {
	return (
		<div className="p-4 border rounded-md shadow-sm space-y-2">
			<Skeleton className="h-6 w-3/4" />
			<Skeleton className="h-4 w-1/2" />
		</div>
	);
}
