import { Button } from "@/components/ui/button";
import type { SpotlightAnime } from "@/types/anime";
import { Play, Info } from "lucide-react";
import Image from "next/image";

export default function HeroItem({ anime }: { anime: SpotlightAnime }) {
	return (
		<div className="md:rounded-xl relative h-[600px] w-full overflow-hidden">
			{/* Gradient Overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />

			{/* Background Image */}
			<div className="absolute inset-0">
				<Image
					src={anime.poster as string}
					alt="Anime Cover"
					fill
					priority
					className="object-cover"
					sizes="100vw"
					quality={90}
				/>
			</div>

			{/* Content */}
			<div className="relative z-20 h-full flex flex-col justify-end py-14 px-6 md:px-8 max-w-3xl">
				{/* Spotlight Badge */}
				<span className="text-yellow-400 font-medium mb-2">
					#{anime.rank} Spotlight
				</span>

				{/* Title */}
				<h1 className="text-2xl md:text-5xl font-bold text-white mb-4">
					{anime.name}
				</h1>

				{/* Metadata */}
				<div className="flex items-center gap-4 text-gray-300 text-sm mb-4">
					<span className="flex items-center">
						<span className="mr-2">{anime.otherInfo[0]}</span>
					</span>
					<span>{anime.otherInfo[1]}</span>
					<span>{anime.otherInfo[2]}</span>
					<span className="px-2 py-1 bg-green-600/20 text-green-400 rounded">
						{anime.otherInfo[3]}
					</span>
					<span className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded">
						CC
					</span>
				</div>

				{/* Description */}
				<p className="text-gray-300 mb-6 max-w-2xl">
					Master Chen leads the prestigious Mountain Peak Academy where students
					learn ancient martial arts and modern combat techniques. The peaceful
					routine is disrupted when a mysterious new student arrives with an
					ancient scroll that could change everything...
				</p>

				{/* Action Buttons */}
				<div className="flex flex-col md:flex-row gap-4">
					<Button className="rounded-full max-w-[180px]">
						<Play className="w-4 h-4 mr-2" />
						Watch Now
					</Button>
					<Button className="rounded-full max-w-[180px]" variant={"secondary"}>
						<Info className="w-4 h-4 mr-2" />
						Details
					</Button>
				</div>
			</div>
		</div>
	);
}
