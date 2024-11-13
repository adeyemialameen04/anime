"use client";

import { useLocalStorage } from "./use-local-storage";

function VideoProgressSave() {
	// Use the useLocalStorage hook to store video progress data
	const [settings, setSettings] = useLocalStorage("vidstack_settings", {});

	// Function to get the progress of a specific video by its ID
	const getVideoProgress = (id: string) => {
		return settings[id];
	};

	// Function to update the video progress for a given video ID
	const updateVideoProgress = (id: string, data: any) => {
		const updatedSettings = { ...settings, [id]: data };
		setSettings(updatedSettings); // Update the state and localStorage
	};

	return [getVideoProgress, updateVideoProgress];
}

export default VideoProgressSave;
