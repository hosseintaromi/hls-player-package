import { useContext } from "react";
import { AdType, OnUpdateTimeType } from "../@types";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { usePlayerEvents } from "./usePlayerEvents";
import { usePlayerContext } from "./usePlayerContext";
import { useSubTitle } from "./useSubTitle";

export const useAds = () => {
	const { config, adsState } = useContext(VideoPlayerContext);
	const { loadMP4Video, loadVideo } = usePlayerEvents();
	const { changeSubtitle, getSubtitles } = useSubTitle();
	let adsConfig = config.ads as AdType[];

	usePlayerContext({
		onUpdateTime: (e: OnUpdateTimeType) => {
			adsState.currentTime = e.time;
			if (adsState.isPlayingAd) return;
			if (
				adsState.currentAd &&
				adsState.currentAd.startTime + 1 === Math.floor(e.time)
			) {
				adsState.avoidAds = false;
			}
			if (adsState.avoidAds) return;
			adsState.currentAd = adsConfig?.find(
				(ad) => ad.startTime === Math.floor(e.time)
			);
			let adToShow = adsState.currentAd;
			if (adToShow) {
				adsState.currentSubtitle = getSubtitles().findIndex(
					(x) => x.is_selected
				);
				loadMP4Video?.(adToShow.src);
				config.startTime = 0;
				// changeSubtitle(-1);
				adsState.isPlayingAd = true;
			}
		},
		onEnd: () => {
			loadOriginalVideo();
		},
	});

	const loadOriginalVideo = () => {
		if (!adsState.isPlayingAd || !config.src || !adsState.currentAd) return;
		loadVideo?.(config.src);
		config.startTime = adsState.currentAd.startTime;
		console.log(adsState.currentSubtitle);
		// adsState.currentSubtitle !== undefined &&
		// 	changeSubtitle(adsState.currentSubtitle);
		adsState.avoidAds = true;
		adsState.isPlayingAd = false;
	};

	const skipCurrentAd = () => {
		if (
			adsState.currentAd?.skipTime &&
			adsState.currentAd?.skipTime <= adsState.currentTime
		) {
			loadOriginalVideo();
		}
	};

	return {
		isPlayingAd: () => adsState.isPlayingAd,
		showToolbar: () =>
			config.showToolbarOnAd ? true : !adsState.isPlayingAd,
		ads: adsConfig,
		currentAd: () => adsState.currentAd,
		skipCurrentAd,
	};
};
