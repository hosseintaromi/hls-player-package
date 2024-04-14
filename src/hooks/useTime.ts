import { usePlayerContext } from "./usePlayerContext";

export const useTime = () => {
	const { getVideoRef, checkBuffer } = usePlayerContext();

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

	return {
		changeTime,
		increaseTime,
		decreaseTime,
		getDuration,
	};
};
