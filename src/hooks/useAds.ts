import { useContext, useEffect, useRef } from "react";
import { AdType, GenericEvents, OnUpdateTimeType } from "../@types";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useVideo } from "./useVideo";
import { useSubTitle } from "./useSubTitle";
import { useSpeed } from "./useSpeed";
import useContextEvents from "./useContextEvents";
import { AdsEventType } from "../@types/ads.model";

export const useAds = (events?: GenericEvents<AdsEventType>) => {
	const { config, adsState, state } = useContext(VideoPlayerContext);
	const { changeSubtitle } = useSubTitle();
	const { changeSpeed, getSpeeds } = useSpeed();
	const { call, listen } = useContextEvents<AdsEventType>(VideoPlayerContext);
	const currentAd = useRef<AdType>();

	let adsConfig = config.ads as AdType[];

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
				currentAd.current = adToShow;
				adsState.isPlayingAd = true;
				call.onStartAd?.(adToShow);
			}
		},
		onEnd: () => {
			call.onEndAd?.(adsState.currentAd?.startTime);
		},
	});

	const skipCurrentAd = () => {
		if (
			adsState.currentAd?.skipTime &&
			adsState.currentAd?.skipTime <= adsState.currentTime
		) {
			call.onSkipAd?.(adsState.currentAd?.startTime);
		}
	};

	useEffect(() => {
		listen(events);
	}, []);

	return {
		isPlayingAd: () => adsState.isPlayingAd,
		showToolbar: () =>
			config.showToolbarOnAd ? true : !adsState.isPlayingAd,
		ads: adsConfig,
		currentAd: () => adsState.currentAd,
		skipCurrentAd,
	};
};
