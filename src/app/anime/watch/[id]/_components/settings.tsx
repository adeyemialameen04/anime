"use client";

import { useState } from "react";
import {
	ArrowBigRightDash,
	FastForward,
	Play,
	ArrowBigLeftDash,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { EpisodeList } from "@/types/anime/anilist";

export type GroupedEpisode = {
	current: number;
	next?: EpisodeList;
	prev?: EpisodeList;
};

export default function ToggleSettings({
	groupedEpisode,
	animeId,
}: { groupedEpisode: GroupedEpisode; animeId: number }) {
	const defaultValues = ["auto-skip", "auto-play"];
	const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues);

	const handleValueChange = (values: string[]) => {
		setSelectedValues(values);
	};

	return (
		<div className="flex flex-col gap-3 sm:flex-row justify-between w-full">
			<ToggleGroup
				type="multiple"
				value={selectedValues}
				onValueChange={handleValueChange}
				className="flex-wrap"
			>
				<ToggleGroupItem
					value="auto-skip"
					aria-label="Toggle auto skip"
					size={"sm"}
					className="flex items-center gap-3"
					variant="outline"
				>
					Auto Skip Intros <FastForward className="h-4 w-4" />
				</ToggleGroupItem>
				<ToggleGroupItem
					value="auto-play"
					aria-label="Toggle auto play"
					size={"sm"}
					className="flex items-center gap-3"
					variant="outline"
				>
					Auto Play <Play className="h-4 w-4" />
				</ToggleGroupItem>
				<ToggleGroupItem
					value="auto-next"
					aria-label="Toggle auto next"
					className="flex items-center gap-3"
					size={"sm"}
					variant="outline"
				>
					Auto Next <ArrowBigRightDash className="h-4 w-4" />
				</ToggleGroupItem>
				{groupedEpisode.prev && (
					<Link
						className="md:hidden"
						href={`/anime/watch/${animeId}?ep=${groupedEpisode.prev?.episodeId}`}
					>
						<Button size={"sm"} className="flex items-center gap-3">
							<ArrowBigLeftDash className="h-4 w-4" />
							Prev
						</Button>
					</Link>
				)}
				{groupedEpisode.next && (
					<Link
						className="md:hidden"
						href={`/anime/watch/${animeId}?ep=${groupedEpisode.next?.episodeId}`}
					>
						<Button size={"sm"} className="flex items-center gap-3">
							Next <ArrowBigRightDash className="h-4 w-4" />
						</Button>
					</Link>
				)}
			</ToggleGroup>
			<div className="items-center gap-2 hidden md:flex">
				{groupedEpisode.prev && (
					<Link
						href={`/anime/watch/${animeId}?ep=${groupedEpisode.prev?.episodeId}`}
					>
						<Button size={"sm"} className="flex items-center gap-3">
							<ArrowBigLeftDash className="h-4 w-4" />
							Prev
						</Button>
					</Link>
				)}
				{groupedEpisode.next && (
					<Link
						href={`/anime/watch/${animeId}?ep=${groupedEpisode.next?.episodeId}`}
					>
						<Button size={"sm"} className="flex items-center gap-3">
							Next <ArrowBigRightDash className="h-4 w-4" />
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
}
