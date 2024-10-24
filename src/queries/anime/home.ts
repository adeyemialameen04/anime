import makeFetch from "@/lib/helpers/fetch";
import type { ScrapedHomePage } from "@/types/anime";

type HomePage = {
	success: boolean;
	data: ScrapedHomePage;
};

export async function getHomePage(): Promise<HomePage | undefined> {
	const fetchHomePage = makeFetch<HomePage>("aniwatch", "/home", null, {
		next: {
			revalidate: 3600,
		},
	});

	try {
		return await fetchHomePage();
	} catch (err) {
		console.error("Error fetching home page:", err);
		return undefined;
	}
}
