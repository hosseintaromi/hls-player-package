import { useCallback, useContext } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useVideo } from "./useVideo";
import { useUpdate } from "./useUpdate";

export const useLevel = () => {
  const context = useContext(VideoPlayerContext);
  const {
    config: { qualities },
  } = useVideo();
  const levelState = useUpdate(
    context.hls?.currentLevel,
    "level",
    VideoPlayerContext,
  );

  const getLevels = useCallback(
    () =>
      context.hls?.levels.filter((item) =>
        qualities.length ? qualities.includes(item.height) : true,
      ),
    [context.hls?.levels, qualities],
  );

  const getCurrentLevel = useCallback(
    () => ({
      currentLevel: context.hls?.currentLevel,
      isAuto: context.hls?.autoLevelEnabled,
      defaultQuality: context?.config?.defaultQuality || null,
    }),
    [
      context?.config?.defaultQuality,
      context.hls?.autoLevelEnabled,
      context.hls?.currentLevel,
    ],
  );

  const changeLevel = (index: number) => {
    if (context.hls) context.hls.currentLevel = index;
    levelState.update(index);
  };

  return {
    getLevels,
    getCurrentLevel,
    changeLevel,
    currentLevel: levelState.subject,
  };
};
