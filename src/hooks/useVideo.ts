import { useContext, useEffect, useRef } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { GenericEvents, PlayerEventsType } from "../@types/player.model";
import { useContextEvents } from "./useContextEvents";
import { useBuffer } from "./useBuffer";

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
	}, []);

	return {
		hls,
		setVideoRef,
		getVideoRef,
		changePlayPause,
		getIsPlay,
		listenOnLoad,
		...config,
	};
};
