import React from "react";
import { ReactNode, createContext } from "react";
import { useContext, useRef } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { AdType, OnUpdateTimeType } from "../@types";
import { usePlayerContext, usePlayerEvents } from "../hooks";

type AdsContextType = {
	isPlayingAd: () => boolean;
	showToolbar: () => boolean;
	ads: AdTypeWithDuration[];
	currentAd: () => AdTypeWithDuration | undefined;
	skipCurrentAd: () => void;
};

export const AdsContext = createContext<AdsContextType>({
	isPlayingAd: () => false,
	showToolbar: () => false,
	ads: [],
	currentAd: () => undefined,
	skipCurrentAd: () => {},
});

export interface AdTypeWithDuration extends AdType {
	duration?: number;
}

const AdsContextProvider = ({ children }: { children: ReactNode }) => {
	const { config } = useContext(VideoPlayerContext);
	const { loadMP4Video, loadVideo } = usePlayerEvents();
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
				config.startTime = 0;
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
		config.startTime = currentAd.current.startTime;
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

	return (
		<AdsContext.Provider
			value={{
				isPlayingAd: () => isPlayingAd.current,
				showToolbar: () =>
					config.showToolbarOnAd ? true : !isPlayingAd.current,
				ads: adsConfig,
				currentAd: () => currentAd.current,
				skipCurrentAd,
			}}
		>
			{children}
		</AdsContext.Provider>
	);
};

export default AdsContextProvider;
