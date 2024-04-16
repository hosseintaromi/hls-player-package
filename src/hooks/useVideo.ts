import { useCallback, useContext, useEffect, useRef } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { GenericEvents, PlayerEventsType } from "../@types/player.model";
import { useContextEvents } from "./useContextEvents";
import { useBuffer } from "./useBuffer";
import Hls from "hls.js";

const isSupportedPlatform = Hls.isSupported();

export const useVideo = (events?: GenericEvents<PlayerEventsType>) => {
	const {
		config,
		setVideoRef: videoRefSetter,
		getVideoRef,
		listenOnLoad,
		hls,
	} = useContext(VideoPlayerContext);
	const timeRef = useRef<number>(0);

	const { checkBuffer } = useBuffer();
	const { listen, call } =
		useContextEvents<PlayerEventsType>(VideoPlayerContext);
	const context = useContext(VideoPlayerContext);

	const loadVideo = useCallback((src: string) => {
		if (config.type === "HLS" && isSupportedPlatform) {
			loadHlsVideo(src);
		} else {
			loadMP4Video(src);
		}
	}, []);

	const loadMP4Video = useCallback((src: string) => {
		context.hls?.destroy();
		const videoEl = getVideoRef();
		if (!videoEl) return;
		videoEl.src = src;
		videoEl.load();
		videoEl.onloadeddata = () => {
			videoEl.currentTime = context.config.startTime || 0;
			listenOnLoad.forEach((listener) => {
				listener();
			});
		};
	}, []);

	const loadHlsVideo = useCallback((src: string) => {
		const videoEl = getVideoRef();
		if (!videoEl) return;

		const hls = (context.hls = new Hls({
			enableWorker: false,
			startPosition: context.config.startTime || 0,
		}));
		hls.attachMedia(videoEl);

		hls.on(Hls.Events.MEDIA_ATTACHED, () => {
			if (isSupportedPlatform) {
				hls.loadSource(src);
			} else {
				videoEl.src = src;
			}
		});
		hls.on(Hls.Events.ERROR, function (event, data) {
			if (data) console.log(JSON.stringify(data));
			if (data.fatal) {
				switch (data.type) {
					case Hls.ErrorTypes.MEDIA_ERROR:
						console.log("MEDIA_ERROR");
						hls.recoverMediaError();
						break;
					case Hls.ErrorTypes.NETWORK_ERROR:
						console.error("fatal network error encountered", data);
						// All retries and media options have been exhausted.
						// Immediately trying to restart loading could cause loop loading.
						// Consider modifying loading policies to best fit your asset and network
						// conditions (manifestLoadPolicy, playlistLoadPolicy, fragLoadPolicy).
						break;
					default:
						// cannot recover
						hls.destroy();
						break;
				}
			}
		});
		hls.on(Hls.Events.LEVEL_LOADED, () => {
			listenOnLoad.forEach((listener) => {
				listener();
			});
		});
	}, []);

	const changePlayPause = (play: boolean) => {
		const videoRef = getVideoRef();
		if (videoRef) {
			play ? videoRef.play() : videoRef.pause();
		}
	};
	const getIsPlay = () => {
		const videoRef = getVideoRef();
		if (videoRef) {
			return !videoRef.paused;
		}
	};

	const setVideoRef = (el?: HTMLVideoElement) => {
		if (!el) return;
		videoRefSetter(el);
		el.onwaiting = () => {
			call.onLoading?.(true);
		};
		el.oncanplay = () => {
			call.onLoading?.(false);
		};
		el.onplay = () => {
			call.onPlayPause?.(true);
		};
		el.onpause = () => {
			call.onPlayPause?.(false);
		};
		el.onended = () => {
			call.onEnd?.();
		};
		el.onloadeddata = () => {
			call.onReady?.(el);
		};
		el.ontimeupdate = () => {
			const currentTime = el.currentTime;
			if (currentTime != timeRef.current) {
				timeRef.current = currentTime;
				const percentage = (currentTime / el.duration) * 100;
				checkBuffer();
				call.onUpdateTime?.({
					time: timeRef.current,
					duration: el.duration,
					percentage,
				});
			}
		};
	};

	useEffect(() => {
		listen(events);
		if (events?.onLoaded) listenOnLoad.push(events?.onLoaded);
	}, []);

	config.loadVideo = loadVideo;

	return {
		hls,
		setVideoRef,
		getVideoRef,
		changePlayPause,
		getIsPlay,
		listenOnLoad,
		loadMP4Video,
		...config,
	};
};
