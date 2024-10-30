export interface Title {
	english: string;
	romaji: string;
	native: string;
	userPreferred: string;
}
// export interface EpisodeList {
// 	id: string;
// 	episodeId: number;
// 	title: string;
// 	number: number;
// }

export interface EpisodeList {
	id: string;
	image: string;
	imageHash: string;
	episodeId: number;
	createdAt: string;
	description: string | null;
	title: string;
	number: number;
}

export interface BaseAnilistAnime {
	id: number;
	idMal: number;
	title: {
		romaji: string;
		english: string;
		native: string;
		userPreferred: string;
	};
	coverImage: {
		extraLarge: string;
		large: string;
		medium: string;
		color: string;
	};
	bannerImage: string;
	episodes: number;
	status: string;
	duration: number;
	genres: string[];
	season: string;
	format: string;
	popularity: number;
	averageScore: number;
	description: string;
	nextAiringEpisode: {
		id: number;
		timeUntilAiring: number;
		airingAt: number;
		episode: number;
	};
	seasonYear: number;
	favourites: number;
	startDate: {
		year: number;
		month: number;
		day: number;
	};
}

export interface AnilistAnime extends BaseAnilistAnime {
	trailer: {
		id: number;
		site: string;
		thumbnail: string;
	};
	countryOfOrigin: string;
	recommendations: {
		edges: {
			node: {
				mediaRecommendation: {
					title: {
						romaji: string;
						english: string;
						native: string;
						userPreferred: string;
					};
					format: string;
					coverImage: {
						extraLarge: string;
						large: string;
						medium: string;
						color: string;
					};
				};
			};
		}[];
	};
	relations: {
		edges: {
			id: number;
			node: {
				title: {
					romaji: string;
					english: string;
					native: string;
					userPreferred: string;
				};
				coverImage: {
					extraLarge: string;
					large: string;
					medium: string;
					color: string;
				};
			};
		}[];
	};
	characters: {
		edges: {
			role: string;
			node: {
				name: {
					first: string;
					middle: string;
					last: string;
					full: string;
					native: string;
					userPreferred: string;
				};
				image: {
					large: string;
					medium: string;
				};
			};
			voiceActors: {
				name: {
					first: string;
					middle: string;
					last: string;
					full: string;
					native: string;
					userPreferred: string;
				};
				image: {
					large: string;
					medium: string;
				};
			}[];
		}[];
	};
	episodesList: EpisodeList[];
}

export interface Sourcedata {
	intro: {
		start: number;
		end: number;
	};
	outro: {
		start: number;
		end: number;
	};
	sources: {
		url: string;
		type: string;
		isM3U8: boolean;
	}[];
	tracks: {
		file: string;
		kind: string;
		label?: string;
		default?: boolean;
	}[];
	server: number;
}

export type ServerType = { serverId: string; serverName: string };

export interface ServersData {
	sub: ServerType[];
	dub: ServerType[];
}
