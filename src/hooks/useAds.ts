import { useEffect } from "react";
import { AdType, GenericEvents, OnUpdateTimeType } from "../@types";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useVideo } from "./useVideo";
import { useContextEvents } from "./useContextEvents";
import { AdsEventType } from "../@types/ads.model";
import { useTime } from "./useTime";

export const useAds = (events?: GenericEvents<AdsEventType>) => {
  const { config, state } = useVideo();
  const { call, listen } = useContextEvents<AdsEventType>(VideoPlayerContext);
  const { getCurrentTime } = useTime();

  let adsConfig = config.ads as AdType[];

  useVideo({
    onUpdateTime: (e: OnUpdateTimeType) => {
      if (state.currentPlayingAd) return;

      // do or don't play ad again
      config.ads?.forEach((ad) => {
        if (ad.startTime + 1 === Math.floor(e.time) && config.showAdsAgain) {
          ad.hasPlayed = false;
        }
      });

      // not to play ad again exactly after it finished
      state.currentPlayingAd = adsConfig?.find(
        (ad) => ad.startTime === Math.floor(e.time) && !ad.hasPlayed,
      );

      let adToShow = state.currentPlayingAd;
      if (state.currentPlayingAd) {
        config.ads?.forEach((ad) => {
          if (ad.startTime === adToShow?.startTime) {
            ad.hasPlayed = true;
          }
        });
        call.onStartAd?.(adToShow);
      }
    },
    onEnd: () => {
      if (state.isPlaying) {
        call.onEndAd?.(state.currentPlayingAd?.startTime);
        state.currentPlayingAd = undefined;
      }
    },
  });

  const skipCurrentAd = () => {
    const currentTime = getCurrentTime();
    if (
      state.currentPlayingAd?.skipTime &&
      currentTime &&
      state.currentPlayingAd?.skipTime <= currentTime
    ) {
      call.onSkipAd?.(state.currentPlayingAd?.startTime);
      state.currentPlayingAd = undefined;
    }
  };

  useEffect(() => {
    listen(events);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isPlayingAd: () => !!state.currentPlayingAd,
    showToolbar: () =>
      config.showToolbarOnAd ? true : !state.currentPlayingAd,
    ads: adsConfig,
    currentAd: () => state.currentPlayingAd,
    skipCurrentAd,
  };
};
