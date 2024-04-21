import React from "react";
import { AdType } from "../../@types";
import { useVideo } from "../../hooks/useVideo";
import { useSubTitle } from "../../hooks/useSubTitle";
import { useSpeed } from "../../hooks/useSpeed";
import { useAds } from "../../hooks/useAds";

export const AdsInitializer = () => {
  const { loadVideo, config, state } = useVideo();
  const { changeSubtitle, getSubtitles, removeSubtitle } = useSubTitle();
  const { changeSpeed, getSpeeds } = useSpeed();

  useAds({
    onStartAd: (data: AdType) => {
      state.prevSubtitle = getSubtitles().findIndex((x) => x.is_selected);
      if (getSpeeds())
        state.prevSpeed = getSpeeds()?.findIndex(
          (s) => s.key === state.currentSpeed?.key,
        );
      loadVideo?.(data.src, "MP4", 0);
      removeSubtitle();
    },
    onSkipAd: (startTime: number) => {
      loadOriginalVideo(startTime);
    },
    onEndAd: (startTime: number) => {
      loadOriginalVideo(startTime);
    },
  });

  const loadOriginalVideo = (startTime: number) => {
    if (!config.src) return;
    loadVideo?.(config.src, config.type, startTime);

    if (state.prevSpeed !== undefined) changeSpeed(state.prevSpeed);
    if (state.prevSubtitle !== undefined) changeSubtitle(state.prevSubtitle);
  };

  return <></>;
};
