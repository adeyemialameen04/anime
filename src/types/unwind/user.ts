import type { MediaTypeEnum, StatusEnum } from "@/app/schema";
import type { TimeStamp } from ".";

export type Profile = {
	id: string;
	userId: string;
	profilePic: string;
	name: string;
	username: string;
	coverPic: string;
};
export type WatchList = {
	id: string;
	userId: string;
	type: MediaTypeEnum;
	mediaId: string;
	poster: string;
	title: string;
	status: StatusEnum;
	episodes: number;
	duration: number;
} & TimeStamp;
