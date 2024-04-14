import { useContext, useEffect, useState } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { KeyValue } from "../@types";

export const useSpeed = () => {
	const [speed, setSpeed] = useState<KeyValue | undefined>();

	const { config, state, getVideoRef } = useContext(VideoPlayerContext);

	const getSpeeds = () => {
		return state.speeds;
	};

	const changeSpeed = (index: number) => {
		const videoRef = getVideoRef();
		if (videoRef) {
			const speeds = getSpeeds();
			if (speeds) {
				videoRef.playbackRate = speeds[index].value;
				setSpeed((state.currentSpeed = speeds[index]));
			}
		}
	};

	const initSpeeds = () => {
		if (!config || !config.speeds) {
			return;
		}
		let speeds: any = config.speeds;

		if (Array.isArray(speeds)) {
			speeds = speeds.map((speed) => ({ key: speed + "", value: speed }));
		} else {
			const speedsArr = [];
			for (let key in speeds as any) {
				speedsArr.push({ key, value: speeds[key] });
			}
			speeds = speedsArr;
		}
		state.speeds = [];
		if (speeds) {
			state.speeds = speeds;
			const videoEl = getVideoRef();
			state.currentSpeed = speeds.find(
				(x: KeyValue) => x.value === videoEl?.playbackRate
			);
		}
	};

	useEffect(() => {
		setSpeed(state.currentSpeed);
	}, []);

	return { initSpeeds, changeSpeed, getSpeeds, speed };
};
