import { useContext, useRef } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { usePlayerContext } from "./usePlayerContext";
import { AdType, OnUpdateTimeType } from "../@types";
import { usePlayerEvents } from "./usePlayerEvents";

export const useAds = () => {
	const { config } = useContext(VideoPlayerContext);
	const { loadMP4Video, loadVideo } = usePlayerEvents();
	const { changeTime } = usePlayerContext();
	const isPlayingAd = useRef(false);
	const avoidAds = useRef(false);
	const currentAd = useRef<AdType>();
	let adsConfig = config.ads;

	usePlayerContext({
		onUpdateTime: (e: OnUpdateTimeType) => {
			if (isPlayingAd.current) return;
			if (
				currentAd.current &&
				currentAd.current.startTime + 1 === Math.floor(e.time)
			) {
				avoidAds.current = false;
			}
			if (avoidAds.current) return;
			currentAd.current = adsConfig?.find(
				(ad) => ad.startTime === Math.floor(e.time)
			);
			let adToShow = currentAd.current;
			if (adToShow) {
				loadMP4Video?.(adToShow.src);
				isPlayingAd.current = true;
			}
		},
		onEnd: () => {
			if (!isPlayingAd.current || !config.src || !currentAd.current)
				return;
			loadVideo?.(config.src);
			changeTime(currentAd.current.startTime);
			avoidAds.current = true;
			isPlayingAd.current = false;
		},
	});

	const initAds = async () => {};

	return {
		initAds,
	};
};
