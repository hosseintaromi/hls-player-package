import { useContext, useEffect } from "react";
import { AdType, OnUpdateTimeType } from "../@types";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useVideo } from "./useVideo";
import { useSubTitle } from "./useSubTitle";
import { useSpeed } from "./useSpeed";
import { useAds } from "./useAds";

export const useAds2 = () => {
	const { config, adsState, state } = useContext(VideoPlayerContext);
	const { loadMP4Video, loadVideo } = useVideo();
	const { changeSubtitle, getSubtitles } = useSubTitle();
	const { changeSpeed, getSpeeds } = useSpeed();

	let adsConfig = config.ads as AdType[];

	useAds({
		onStartAd: (data) => {},
	});

	useVideo({
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
				if (getSpeeds())
					adsState.speed = getSpeeds()?.findIndex(
						(s) => s.key === state.currentSpeed?.key
					);
				loadMP4Video?.(adToShow.src);
				config.startTime = 0;
				changeSubtitle(-1);
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
		if (adsState.speed !== undefined) changeSpeed(adsState.speed);
		changeSubtitle(0);

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
