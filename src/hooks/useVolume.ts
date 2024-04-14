import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { PlayerEventsType } from "../@types";
import { usePlayerContext } from "./usePlayerContext";
import useContextEvents from "./useContextEvents";

export const useVolume = () => {
	const { getVideoRef } = usePlayerContext();
	const { call } = useContextEvents<PlayerEventsType>(VideoPlayerContext);

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

	return { getVolume, changeMute, changeVolume };
};
