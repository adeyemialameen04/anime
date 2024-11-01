"use client";
import { useState } from "react";

function VideoProgressSave() {
	const [settings, setSettings] = useState(() => {
		const storedSettings = localStorage?.getItem("vidstack_settings");
		return storedSettings ? JSON.parse(storedSettings) : {};
	});

	const getVideoProgress = (id: string) => {
		return settings[id];
	};

	const UpdateVideoProgress = (id: string, data) => {
		const updatedSettings = { ...settings, [id]: data };
		setSettings(updatedSettings);

		localStorage.setItem("vidstack_settings", JSON.stringify(updatedSettings));
	};

	return [getVideoProgress, UpdateVideoProgress];
}

export default VideoProgressSave;
