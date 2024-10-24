import { getHomePage } from "@/queries/anime/home";

export default async function Home() {
	const homePage = await getHomePage();

	return (
		<div>
			{homePage?.data.genres.map((genre, index) => (
				<p>{genre}</p>
			))}
		</div>
	);
}
