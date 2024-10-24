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

export interface IAnimeEpisode {
	id: string;
	number: number;
	title?: string;
	description?: string;
	isFiller?: boolean;
	url?: string;
	image?: string;
	imageHash?: string;
	releaseDate?: string;
	[x: string]: unknown;
}

export interface Trailer {
	id: string;
	url?: string;
	site?: string;
	thumbnail?: string;
	thumbnailHash?: string | null;
}
export interface FuzzyDate {
	year?: number;
	month?: number;
	day?: number;
}

export declare enum SubOrSub {
	SUB = "sub",
	DUB = "dub",
	BOTH = "both",
}
export interface IAnimeInfo extends IAnimeResult {
	malId?: number | string;
	genres?: string[];
	description?: string;
	status?: MediaStatus;
	totalEpisodes?: number;
	/**
	 * @deprecated use `hasSub` or `hasDub` instead
	 */
	subOrDub?: SubOrSub;
	hasSub?: boolean;
	hasDub?: boolean;
	synonyms?: string[];
	/**
	 * two letter representation of coutnry: e.g JP for japan
	 */
	countryOfOrigin?: string;
	isAdult?: boolean;
	isLicensed?: boolean;
	/**
	 * `FALL`, `WINTER`, `SPRING`, `SUMMER`
	 */
	season?: string;
	studios?: string[];
	color?: string;
	cover?: string;
	trailer?: Trailer;
	episodes?: IAnimeEpisode[];
	startDate?: FuzzyDate;
	endDate?: FuzzyDate;
	recommendations?: IAnimeResult[];
	relations?: IAnimeResult[];
}

// export interface TrendingAnime {
//   <ISearch<IAnimeResult>>
// }
