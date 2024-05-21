import { useContext } from "react";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";
import { useLocale } from "../../hooks/useLocale";
import { useSubTitle } from "../../hooks/useSubTitle";
import { useSpeed } from "../../hooks/useSpeed";
import { useVideo } from "../../hooks/useVideo";
import { useAds } from "../../hooks";
import { AdType } from "../../@types";
import { useInit } from "../../hooks/useInit";

const PlayerInitializer = () => {
  const context = useContext(VideoPlayerContext);

  const { changeLocale } = useLocale({});
  const { initSubtitle, changeSubtitle, getSubtitles, removeSubtitle } =
    useSubTitle();
  const { initSpeeds, changeSpeed, getSpeeds } = useSpeed();

  const initConfig = () => {
    initSpeeds();
    initSubtitle();
  };

  const { loadVideo, config, state } = useVideo({
    onChangeSrc(data) {
      context.hls?.destroy();
      loadVideo(data.src, data.type, data.startTime);
      initConfig();
    },
  });

  const loadOriginalVideo = (startTime: number) => {
    if (!config.src) return;
    loadVideo?.(config.src, config.type, startTime);

    if (state.prevSpeed !== undefined) changeSpeed(state.prevSpeed);
    if (state.prevSubtitle !== undefined) changeSubtitle(state.prevSubtitle);
  };

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

  useInit(() => {
    if (context.config.src) {
      loadVideo(context.config.src);
    }
    context.config.changeLocale = changeLocale;

    initConfig();
    return () => {
      context.hls?.destroy();
    };
  });

  return <></>;
};

export default PlayerInitializer;
