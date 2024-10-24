import makeFetch from "@/lib/helpers/fetch";
import type { ScrapedHomePage } from "@/types/anime";
import type { SuccessResponse } from "@/types/api";

export async function getHomePage(): Promise<
	SuccessResponse<ScrapedHomePage> | undefined
> {
	const fetchHomePage = makeFetch<SuccessResponse<ScrapedHomePage>>(
		"aniwatch",
		"/home",
		null,
		{
			next: {
				revalidate: 3600,
			},
		},
	);

	try {
		return await fetchHomePage();
	} catch (err) {
		console.error("Error fetching home page:", err);
		return undefined;
	}
}
