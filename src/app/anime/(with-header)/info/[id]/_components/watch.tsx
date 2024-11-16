"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import VideoProgressSave from "@/hooks/video-progress-save";
import { Play } from "lucide-react";
import Link from "next/link";
import { progress } from "framer-motion";

export default function Watch({
	id,
	firstEpisodeId,
}: {
	id: string;
	firstEpisodeId: number;
}) {
	const [getVideoProgress] = VideoProgressSave();
	const [videoProgress, setVideoProgress] = useState<{
		episodeId: number;
	} | null>(null);

	useEffect(() => {
		const progress = getVideoProgress(id);

		setVideoProgress(progress ? { episodeId: progress.episodeId } : null);
	}, [id]);

	return (
		<Link
			href={`/anime/watch/${id}/${videoProgress?.episodeId ?? firstEpisodeId}`}
		>
			<Button className="">
				<Play className="h-4 w-4" />{" "}
				{videoProgress ? "Continue Watching" : "Watch"}
			</Button>
		</Link>
	);
}
