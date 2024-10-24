import {
	Card,
	CardContent,
	CardTitle,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import type { IAnimeResult, ITitle } from "@/types/anime/gogoanime";
import { TabsContent } from "@radix-ui/react-tabs";
import { ImageIcon } from "lucide-react";
import parse from "html-react-parser";
import Image from "next/image";
import truncateText from "@/lib/helpers/truncate";
import Link from "next/link";

export default async function Trending({
	trending,
}: { trending: IAnimeResult[] }) {
	return (
		<TabsContent value="trending">
			<div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{trending.map((anime) => {
					const title = anime.title as ITitle;

					return (
						<Link href={`/anime/${anime.id}`} key={anime.id}>
							<Card className="overflow-hidden">
								<div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-background/50 shadow">
									{anime.cover ? (
										<Image
											fill
											className="object-cover"
											src={anime.cover}
											alt={title.userPreferred as string}
											sizes="100vw"
											priority
											quality={90}
										/>
									) : (
										<ImageIcon className="text-muted" />
									)}
								</div>
								<CardHeader>
									<CardTitle className="font-space-grotesk capitalize">
										{truncateText(
											title?.english ||
												title?.userPreferred ||
												title?.romaji ||
												"Untitled",
											{
												maxLength: 40,
											},
										)}
									</CardTitle>
								</CardHeader>
								<CardContent className="">
									<CardDescription>
										{parse(truncateText(anime.description, { maxLength: 150 }))}
									</CardDescription>
								</CardContent>
								{/* <CardHeader className="relative aspect-[3/4] w-full p-0 bg-gray-100 animate-pulse"> */}
								{/* 	<Image */}
								{/* 		fill */}
								{/* 		src={anime.poster as string} */}
								{/* 		alt={anime.name as string} */}
								{/* 		className="object-cover transition-all duration-300" */}
								{/* 		sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" */}
								{/* 		quality={90} */}
								{/* 		priority={false} */}
								{/* 		placeholder="blur" */}
								{/* 		blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsfHyUdHx0dJSEwHx0dHR8hMC0kHR0rIRghJS0tLSEiKSkpHR0sLSksKSkpKSn/2wBDAQUXFx0aHR4dHSkiJSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=" */}
								{/* 	/> */}
								{/* </CardHeader> */}
							</Card>
						</Link>
					);
				})}
			</div>
		</TabsContent>
	);
}
