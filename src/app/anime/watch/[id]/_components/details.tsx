import type { ServersData, Sourcedata } from "@/types/anime/anilist";
import { MediaPlayer, MediaProvider, Track } from "@vidstack/react";
import {
	defaultLayoutIcons,
	DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { RemotionPoster } from "@vidstack/react/player/remotion";
import Servers from "./servers";

export default function WatchDetails({
	sources,
	servers,
}: { sources: Sourcedata; servers: ServersData }) {
	const subtitles = sources.tracks.filter((track) => track.kind === "captions");
	const defaultSourceUrl = sources.sources[0].url;

	return (
		<div>
			<MediaPlayer src={defaultSourceUrl}>
				<MediaProvider>
					{subtitles.map((track) => (
						<Track
							src={track.file}
							label={track.label}
							lang=""
							kind="subtitles"
							key={track.label}
							default={track.label?.toLowerCase() === "english"}
						/>
					))}
					<RemotionPoster className="vds-poster" frame={10} />
				</MediaProvider>
				<DefaultVideoLayout icons={defaultLayoutIcons} />
			</MediaPlayer>
			<Servers servers={servers} />
		</div>
	);
}
