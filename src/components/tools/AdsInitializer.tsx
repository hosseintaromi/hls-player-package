import React, { useContext } from "react";
import { AdType } from "../../@types";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";
import { useVideo } from "../../hooks/useVideo";
import { useSubTitle } from "../../hooks/useSubTitle";
import { useSpeed } from "../../hooks/useSpeed";
import { useAds } from "../../hooks/useAds";

export const AdsInitializer = () => {
	const { config, adsState, state } = useContext(VideoPlayerContext);
	const { loadVideo, getVideoRef } = useVideo();
	const { changeSubtitle, getSubtitles, removeSubtitle } = useSubTitle();
	const { changeSpeed, getSpeeds } = useSpeed();

	useAds({
		onStartAd: (data: AdType) => {
			state.prevSubtitle = getSubtitles().findIndex((x) => x.is_selected);
			if (getSpeeds())
				adsState.speed = getSpeeds()?.findIndex(
					(s) => s.key === state.currentSpeed?.key
				);
			loadVideo?.(data.src, "MP4", 0);
			removeSubtitle();
		},
		onSkipAd: (startTime: number) => {
			console.log(startTime);

			loadOriginalVideo(startTime);
		},
		onEndAd: (startTime: number) => {
			console.log(startTime);
			loadOriginalVideo(startTime);
		},
	});

	const loadOriginalVideo = (startTime: number) => {
		if (!config.src) return;
		loadVideo?.(config.src, config.type, startTime);
		if (adsState.speed !== undefined) changeSpeed(adsState.speed);
		if (state.prevSubtitle !== undefined)
			changeSubtitle(state.prevSubtitle);

		// adsState.currentSubtitle !== undefined &&
		// 	changeSubtitle(adsState.currentSubtitle);
		adsState.avoidAds = true;
		adsState.isPlayingAd = false;
	};

	return <></>;
};
