import { useContext } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useVideo } from "./useVideo";

export const useLevel = () => {
  const context = useContext(VideoPlayerContext);
  const {
    config: { qualities },
  } = useVideo();

  const getLevels = () =>
    context.hls?.levels.filter((item) =>
      qualities.length ? qualities.includes(item.height) : true,
    );

  const getCurrentLevel = () => ({
    currentLevel: context.hls?.currentLevel,
    isAuto: context.hls?.autoLevelEnabled,
    defaultQuality: context?.config?.defaultQuality || null,
  });

  const changeLevel = (index: number) => {
    if (context.hls) context.hls.currentLevel = index;
  };

  return {
    getLevels,
    getCurrentLevel,
    changeLevel,
  };
};
