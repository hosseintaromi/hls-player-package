import { useContext, useEffect, useRef, useState } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import {
	GenericEvents,
	KeyValue,
	PlayerEventsType,
} from "../@types/player.model";
import { useContextEvents } from "./useContextEvents";
import { findBufferIndex } from "../utils/player-utils";

export const usePlayerContext = (events?: GenericEvents<PlayerEventsType>) => {
	const {
		config,
		setVideoRef: videoRefSetter,
		getVideoRef,
		listenOnLoad,
		state,
		hls,
	} = useContext(VideoPlayerContext);
	const timeRef = useRef<number>(0);
	const currentBuffer = useRef<{ index: number; length: number }>();

	const { listen, call } =
		useContextEvents<PlayerEventsType>(VideoPlayerContext);

	const getVolume = () => {
		const videoRef = getVideoRef();
		if (videoRef)
			return { volume: videoRef.volume, isMuted: videoRef.muted };
	};

	const changeMute = (e: boolean) => {
		const videoRef = getVideoRef();
		if (videoRef) videoRef.muted = e;
		call.onChangeMute?.(e);
	};

	const changeVolume = (newVolume: number) => {
		const videoRef = getVideoRef();
		if (videoRef) {
			call.onChangeVolume?.(newVolume);
			if (videoRef.muted) {
				call.onChangeMute?.(false);
				videoRef.muted = false;
			}
			videoRef.volume = newVolume;
		}
	};

	const changeTime = (time: number) => {
		const el = getVideoRef();
		if (el) el.currentTime = time;
		checkBuffer(true);
	};

	const increaseTime = (time: number) => {
		const el = getVideoRef();
		if (el) el.currentTime = el.currentTime + time;
		checkBuffer(true);
	};
	const decreaseTime = (time: number) => {
		const el = getVideoRef();
		if (el) el.currentTime = el.currentTime - time;
		checkBuffer(true);
	};

	const getDuration = () => {
		const el = getVideoRef();
		return el?.duration;
	};

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

	const checkBuffer = (forceUpdate?: boolean) => {
		const videoEl = getVideoRef();
		if (!videoEl) return;
		const buffer = getCurrentBuffer(videoEl, forceUpdate);
		if (!buffer) debugger;
		const bufferSize =
			buffer.index >= 0
				? (videoEl.buffered.end(buffer.index) / videoEl.duration) * 100
				: 0;
		call.onUpdateBuffer?.(bufferSize);
	};

	const getCurrentBuffer = (el: HTMLVideoElement, forceUpdate?: boolean) => {
		const bufferLength = el.buffered.length;
		if (bufferLength === 0) return { length: 0, index: -1 };
		const oldBuffer = currentBuffer.current;
		if (oldBuffer && bufferLength === oldBuffer.length && !forceUpdate) {
			return oldBuffer;
		}
		currentBuffer.current = findBufferIndex(el);
		return currentBuffer.current;
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
		changeTime,
		increaseTime,
		decreaseTime,
		getVolume,
		changeMute,
		changeVolume,
		getDuration,
		listenOnLoad,
		...config,
	};
};
