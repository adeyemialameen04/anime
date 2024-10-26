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
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import Hls from "hls.js";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoPlayer({
	streamUrl,
	subtitlesUrl,
}: { streamUrl: string; subtitlesUrl?: string | null }) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [volume, setVolume] = useState(1);
	const [isMuted, setIsMuted] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [showControls, setShowControls] = useState(false);
	const [showPauseAnimation, setShowPauseAnimation] = useState(false);
	const [showSeekAnimation, setShowSeekAnimation] = useState<
		"forward" | "backward" | null
	>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const playerRef = useRef<HTMLDivElement>(null);
	const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const hls = new Hls();

		if (video.canPlayType("application/vnd.apple.mpegurl")) {
			video.src = streamUrl;
		} else if (Hls.isSupported()) {
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
	}, [streamUrl]);

	useEffect(() => {
		if (subtitlesUrl && videoRef.current) {
			const track = document.createElement("track");
			track.kind = "captions";
			track.label = "English";
			track.srclang = "en";
			track.src = subtitlesUrl;
			track.default = true;

			videoRef.current.appendChild(track);

			return () => {
				if (videoRef.current) {
					videoRef.current.removeChild(track);
				}
			};
		}
	}, [subtitlesUrl]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") {
				seekBackward();
			} else if (e.key === "ArrowRight") {
				seekForward();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
				setShowPauseAnimation(true);
				setTimeout(() => setShowPauseAnimation(false), 500);
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

	const seekBackward = () => {
		if (videoRef.current) {
			videoRef.current.currentTime -= 10;
			setShowSeekAnimation("backward");
			setTimeout(() => setShowSeekAnimation(null), 500);
		}
	};

	const seekForward = () => {
		if (videoRef.current) {
			videoRef.current.currentTime += 10;
			setShowSeekAnimation("forward");
			setTimeout(() => setShowSeekAnimation(null), 500);
		}
	};

	const handleMouseEnter = () => {
		setShowControls(true);
		if (controlsTimeoutRef.current) {
			clearTimeout(controlsTimeoutRef.current);
		}
	};

	const handleMouseLeave = () => {
		controlsTimeoutRef.current = setTimeout(() => {
			setShowControls(false);
		}, 2000);
	};

	const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
		const video = e.currentTarget;
		const rect = video.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const width = rect.width;

		if (x < width / 3) {
			seekBackward();
		} else if (x > (width * 2) / 3) {
			seekForward();
		} else {
			togglePlay();
		}
	};

	return (
		<>
			{subtitlesUrl}
			<div
				ref={playerRef}
				className="relative w-full mx-auto bg-black"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<video
					ref={videoRef}
					className="w-full cursor-pointer"
					poster="/placeholder.svg?height=400&width=800"
					onClick={handleVideoClick}
					onDoubleClick={handleVideoClick}
				/>
				<track
					label="English"
					kind="subtitles"
					// srclang="en"
					src={subtitlesUrl}
					default
				/>
				<AnimatePresence>
					{showPauseAnimation && (
						<motion.div
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
							className="absolute inset-0 flex items-center justify-center"
						>
							<div className="bg-black bg-opacity-50 rounded-full p-4">
								<Pause className="w-16 h-16 text-white" />
							</div>
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence>
					{showSeekAnimation && (
						<motion.div
							initial={{
								opacity: 0,
								x: showSeekAnimation === "forward" ? 20 : -20,
							}}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0 }}
							className={`absolute top-1/2 ${
								showSeekAnimation === "forward" ? "right-4" : "left-4"
							} transform -translate-y-1/2`}
						>
							<div className="bg-black bg-opacity-50 rounded-full p-2">
								{showSeekAnimation === "forward" ? (
									<ChevronRight className="w-8 h-8 text-white" />
								) : (
									<ChevronLeft className="w-8 h-8 text-white" />
								)}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
				{showControls && (
					<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300">
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
									<span className="sr-only">
										{isPlaying ? "Pause" : "Play"}
									</span>
								</Button>
								<Button variant="ghost" size="icon" onClick={seekBackward}>
									<Rewind className="w-6 h-6" />
									<span className="sr-only">Rewind 10 seconds</span>
								</Button>
								<Button variant="ghost" size="icon" onClick={seekForward}>
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
										<span className="sr-only">
											{isMuted ? "Unmute" : "Mute"}
										</span>
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
				)}
			</div>
		</>
	);
}
