import { useContext } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useVideo } from "./useVideo";

export const useLevel = () => {
	const context = useContext(VideoPlayerContext);
	const { qualities } = useVideo();

	const getLevels = () => {
		return context.hls?.levels.filter((item) =>
			qualities.length ? qualities.includes(item.height) : true
		);
	};

	const getCurrentLevel = () => {
		return {
			currentLevel: context.hls?.currentLevel,
			isAuto: context.hls?.autoLevelEnabled,
			defaultQuality: context?.config?.defaultQuality || null,
		};
	};

	const changeLevel = (index: number) => {
		if (context.hls) context.hls.currentLevel = index;
	};

	return {
		getLevels,
		getCurrentLevel,
		changeLevel,
	};
};
