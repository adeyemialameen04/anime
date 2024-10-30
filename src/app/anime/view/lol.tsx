import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
	DefaultAudioLayout,
	defaultLayoutIcons,
	DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import { RemotionPoster } from "@vidstack/react/player/remotion";
export default function Heyy() {
	return (
		<>
			<div className="md:container">
				<MediaPlayer
					playsInline
					src={
						"https://www088.anzeat.pro/streamhls/0b594d900f47daabc194844092384914/ep.1.1703914189.480.m3u8"
					}
					crossOrigin="anonymous"
					streamType="on-demand"
					autoPlay
				>
					<MediaProvider>
						<RemotionPoster className="vds-poster" frame={10} />
						<DefaultAudioLayout icons={defaultLayoutIcons} />
						<DefaultVideoLayout icons={defaultLayoutIcons} />
					</MediaProvider>
				</MediaPlayer>
			</div>
		</>
	);
}
