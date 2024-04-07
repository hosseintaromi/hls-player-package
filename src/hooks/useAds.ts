import { useContext, useRef } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { usePlayerContext } from "./usePlayerContext";
import { AdType, OnUpdateTimeType } from "../@types";
import { usePlayerEvents } from "./usePlayerEvents";

interface AdTypeWithDuration extends AdType {
	duration?: number;
}

export const useAds = () => {
	const { config } = useContext(VideoPlayerContext);
	const { loadMP4Video, loadVideo } = usePlayerEvents();
	const { changeTime } = usePlayerContext();
	const isPlayingAd = useRef(false);
	const avoidAds = useRef(false);
	const currentAd = useRef<AdTypeWithDuration>();
	const currentTime = useRef<number>(0);
	let adsConfig = config.ads as AdTypeWithDuration[];

	usePlayerContext({
		onUpdateTime: (e: OnUpdateTimeType) => {
			currentTime.current = e.time;
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
				changeTime(0);
				isPlayingAd.current = true;
			}
		},
		onEnd: () => {
			loadOriginalVideo();
		},
	});

	const loadOriginalVideo = () => {
		if (!isPlayingAd.current || !config.src || !currentAd.current) return;
		loadVideo?.(config.src);
		changeTime(currentAd.current.startTime);
		avoidAds.current = true;
		isPlayingAd.current = false;
	};

	const skipCurrentAd = () => {
		if (
			currentAd.current &&
			currentAd.current?.skipTime &&
			currentAd.current?.skipTime <= currentTime.current
		) {
			loadOriginalVideo();
		}
	};

	return {
		isPlayingAd: () => isPlayingAd.current,
		showToolbar: () =>
			config.showToolbarOnAd ? true : !isPlayingAd.current,
		ads: adsConfig,
		currentAd: () => currentAd.current,
		skipCurrentAd,
	};
};
