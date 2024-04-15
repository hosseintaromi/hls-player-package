import { useContext, useEffect } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useVideo } from "./useVideo";

export interface HlsVideoEventType {
	onLoaded?: () => void;
}
export const usePlayerEvents = (events?: HlsVideoEventType) => {
	const { listenOnLoad, subTitle, audioTracks } = useVideo();
	const context = useContext(VideoPlayerContext);

	// const getSubtitle = () => {
	// 	return context.hls?.subtitleTracks.filter((item) =>
	// 		subTitle.length ? subTitle.includes(item.name) : true
	// 	);
	// };
	// const getCurrentSubtitle = () => {
	// 	return context.hls?.subtitleTrack;
	// };
	// const changeSubtitle = (index: number) => {
	// 	if (context.hls) context.hls.subtitleTrack = index;
	// };

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

	useEffect(() => {
		if (events?.onLoaded) listenOnLoad.push(events?.onLoaded);
	}, []);

	return {
		// getSubtitle,
		// getCurrentSubtitle,
		getAudioTracks,
		getAudioTrack,
		changeAudioTrack,
	};
};
