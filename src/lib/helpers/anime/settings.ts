import type { PlayerSettings } from "@/app/anime/watch/[id]/[episodeId]/_components/details";
import Cookie from "js-cookie";

export const saveSettings = (settings: PlayerSettings) => {
	Cookie.set("settings", JSON.stringify(settings));
};

export const getSettings = (): PlayerSettings => {
	const settings = Cookie.get("settings");
	return settings && JSON.parse(settings);
};
