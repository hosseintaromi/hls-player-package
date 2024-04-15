import { useContext, useEffect } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useVideo } from "./useVideo";

export const useAudio = () => {
	const { audioTracks } = useVideo();
	const context = useContext(VideoPlayerContext);

	const getAudioTracks = () => {
		return context.hls?.audioTracks.filter((item) =>
			audioTracks.length ? audioTracks.includes(item.name) : true
		);
	};

	const getAudioTrack = () => {
		return context.hls?.audioTrack;
	};

	const changeAudioTrack = (index: number) => {
		if (context.hls) context.hls.audioTrack = index;
	};

	return {
		getAudioTracks,
		getAudioTrack,
		changeAudioTrack,
	};
};
