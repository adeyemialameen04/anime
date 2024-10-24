export declare enum MediaFormat {
	TV = "TV",
	TV_SHORT = "TV_SHORT",
	MOVIE = "MOVIE",
	SPECIAL = "SPECIAL",
	OVA = "OVA",
	ONA = "ONA",
	MUSIC = "MUSIC",
	MANGA = "MANGA",
	NOVEL = "NOVEL",
	ONE_SHOT = "ONE_SHOT",
}

export declare enum MediaStatus {
	ONGOING = "Ongoing",
	COMPLETED = "Completed",
	HIATUS = "Hiatus",
	CANCELLED = "Cancelled",
	NOT_YET_AIRED = "Not yet aired",
	UNKNOWN = "Unknown",
}

export interface ITitle {
	romaji?: string;
	english?: string;
	native?: string;
	userPreferred?: string;
}
export interface IAnimeResult {
	id: string;
	title: string | ITitle;
	url?: string;
	image?: string;
	imageHash?: string;
	cover?: string;
	coverHash?: string;
	status?: MediaStatus;
	rating?: number;
	type?: MediaFormat;
	releaseDate?: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[x: string]: any;
}

export interface ISearch<T> {
	currentPage?: number;
	hasNextPage?: boolean;
	totalPages?: number;
	/**
	 * total results must include results from all pages
	 */
	totalResults?: number;
	results: T[];
}

// export interface TrendingAnime {
//   <ISearch<IAnimeResult>>
// }
