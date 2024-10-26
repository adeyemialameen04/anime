"use client";

import { useState, useRef, useEffect } from "react";
import {
	Play,
	Pause,
	Volume2,
	VolumeX,
	Maximize,
	Minimize,
	Rewind,
	FastForward,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import Hls from "hls.js";

export default function VideoPlayer() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [volume, setVolume] = useState(1);
	const [isMuted, setIsMuted] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const playerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const hls = new Hls();
		// Replace this URL with your actual m3u8 stream URL
		// const streamUrl = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

		const streamUrl =
			"https://tt57.biananset.net/_v7/00285001531c55a1e954d2b0b81394cde680db71586fa7baa23845191ca0728f9f661524bcc58b7ed4dfe2f2d5ca4833057ce79a79adf5fac0270a7d9d812625eac5b93c4b0ea34c0442b74377cd92720932002fc553b4f1e3e52170ee3a0d1f727dca5bd27bb3a21bbe2252ee9dfad1ad91eeeaa3e8b2031b2837a3216c0019/master.m3u8";
		if (video.canPlayType("application/vnd.apple.mpegurl")) {
			// Native HLS support
			video.src = streamUrl;
		} else if (Hls.isSupported()) {
			// HLS via hls.js
			hls.loadSource(streamUrl);
			hls.attachMedia(video);
		} else {
			console.error("This browser does not support HLS");
		}

		const updateProgress = () => {
			const progress = (video.currentTime / video.duration) * 100;
			setProgress(progress);
		};

		video.addEventListener("timeupdate", updateProgress);
		return () => {
			video.removeEventListener("timeupdate", updateProgress);
			hls.destroy();
		};
	}, []);

	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const handleVolumeChange = (newVolume: number[]) => {
		const volumeValue = newVolume[0];
		setVolume(volumeValue);
		if (videoRef.current) {
			videoRef.current.volume = volumeValue;
		}
		setIsMuted(volumeValue === 0);
	};

	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !isMuted;
			setIsMuted(!isMuted);
		}
	};

	const handleProgressChange = (newProgress: number[]) => {
		const progressValue = newProgress[0];
		setProgress(progressValue);
		if (videoRef.current) {
			videoRef.current.currentTime =
				(progressValue / 100) * videoRef.current.duration;
		}
	};

	const toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			playerRef.current?.requestFullscreen();
			setIsFullscreen(true);
		} else {
			document.exitFullscreen();
			setIsFullscreen(false);
		}
	};

	const rewind = () => {
		if (videoRef.current) {
			videoRef.current.currentTime -= 10;
		}
	};

	const fastForward = () => {
		if (videoRef.current) {
			videoRef.current.currentTime += 10;
		}
	};

	return (
		<div ref={playerRef} className="relative w-full max-w-4xl mx-auto bg-black">
			<video
				ref={videoRef}
				className="w-full"
				poster="/placeholder.svg?height=400&width=800"
			/>
			<div className="absolute inset-0 flex items-center justify-center">
				{!isPlaying && (
					<Button
						variant="ghost"
						size="icon"
						className="w-16 h-16 text-white bg-black/50 rounded-full hover:bg-black/70"
						onClick={togglePlay}
					>
						<Play className="w-8 h-8" />
						<span className="sr-only">Play</span>
					</Button>
				)}
			</div>
			<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
				<Slider
					value={[progress]}
					max={100}
					step={0.1}
					onValueChange={handleProgressChange}
					className="w-full mb-4"
				/>
				<div className="flex items-center justify-between text-white">
					<div className="flex items-center space-x-2">
						<Button variant="ghost" size="icon" onClick={togglePlay}>
							{isPlaying ? (
								<Pause className="w-6 h-6" />
							) : (
								<Play className="w-6 h-6" />
							)}
							<span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
						</Button>
						<Button variant="ghost" size="icon" onClick={rewind}>
							<Rewind className="w-6 h-6" />
							<span className="sr-only">Rewind 10 seconds</span>
						</Button>
						<Button variant="ghost" size="icon" onClick={fastForward}>
							<FastForward className="w-6 h-6" />
							<span className="sr-only">Fast forward 10 seconds</span>
						</Button>
						<div className="flex items-center space-x-2">
							<Button variant="ghost" size="icon" onClick={toggleMute}>
								{isMuted ? (
									<VolumeX className="w-6 h-6" />
								) : (
									<Volume2 className="w-6 h-6" />
								)}
								<span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
							</Button>
							<Slider
								value={[isMuted ? 0 : volume]}
								max={1}
								step={0.01}
								onValueChange={handleVolumeChange}
								className="w-24"
							/>
						</div>
					</div>
					<Button variant="ghost" size="icon" onClick={toggleFullscreen}>
						{isFullscreen ? (
							<Minimize className="w-6 h-6" />
						) : (
							<Maximize className="w-6 h-6" />
						)}
						<span className="sr-only">
							{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
						</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
