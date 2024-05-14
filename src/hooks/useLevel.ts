import { useCallback, useContext } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useVideo } from "./useVideo";
import { useUpdate } from "./useUpdate";
import { useTime } from "./useTime";
import { useSignal } from "./useSignal";

export const useLevel = () => {
  const context = useContext(VideoPlayerContext);
  const { getCurrentTime } = useTime();
  const {
    config: { src },
    loadVideo,
  } = useVideo();

  const levelState = useUpdate(
    context.hls?.currentLevel,
    "level",
    VideoPlayerContext,
  );
  const levelsState = useUpdate<{ level: number }[]>(
    context.hls?.levels?.map((level) => ({ level: level.height })) || [],
    "levels",
    VideoPlayerContext,
  );
  const $levels = useSignal(levelsState.subject);

  const initLevels = useCallback(() => {
    const state = context.state;
    const qualities: any = [];
    const lines = state.metaData;
    if (!src) return;
    if (!context.hls) {
      if (lines) {
        let baseUrl = src.split(".m3u8")[0];
        const lastSlashIndex = baseUrl.lastIndexOf("/");
        baseUrl = baseUrl.substring(0, lastSlashIndex + 1);
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const len = qualities.length;
          if (line.indexOf("#EXT-X-STREAM-INF") === 0) {
            try {
              const resolution: string[] = line
                .split(",")
                .filter(
                  (param) => param.toUpperCase().indexOf("RESOLUTION=") === 0,
                );
              if (resolution.length === 1) {
                qualities[len] = {
                  level: resolution[0].split("=")[1].split("x")[1],
                };
              }
            } catch (exp) {
              break;
            }
          } else if (qualities[len - 1] && !qualities[len - 1].url) {
            qualities[len - 1].url = baseUrl + line;
          }
        }
        state.levels = qualities;
        levelsState.update(
          state.levels?.map((level) => ({ level: level.level })) || [],
        );
      }
    } else {
      levelsState.update(
        context.hls?.levels
          .filter((item) =>
            qualities.length ? qualities.includes(item.height) : true,
          )
          .map((level) => ({ level: level.height })) || [],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useVideo({
    onReady: () => {
      initLevels();
    },
  });

  const getCurrentLevel = useCallback(
    () => ({
      currentLevel: context.hls?.currentLevel || levelState.subject.value,
      isAuto: context.hls?.autoLevelEnabled,
      defaultQuality: context?.config?.defaultQuality || null,
    }),
    [
      context?.config?.defaultQuality,
      context.hls?.autoLevelEnabled,
      context.hls?.currentLevel,
      levelState.subject.value,
    ],
  );

  const changeLevel = (index: number) => {
    const state = context.state;
    if (context.hls) {
      context.hls.currentLevel = index;
    } else if (state.levels?.[index]) {
      loadVideo((state.levels?.[index]).url, "HLS", getCurrentTime());
    }
    levelState.update(index);
  };

  return {
    levels: $levels,
    getCurrentLevel,
    changeLevel,
    currentLevel: levelState.subject,
  };
};
