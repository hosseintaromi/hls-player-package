import { useCallback, useContext, useEffect } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useVideo } from "./useVideo";
import { useUpdate } from "./useUpdate";
import { useTime } from "./useTime";

export const useLevel = () => {
  const context = useContext(VideoPlayerContext);
  const { getCurrentTime } = useTime();
  const {
    config: { qualities, src },
    loadVideo,
  } = useVideo();
  const levelState = useUpdate(
    context.hls?.currentLevel,
    "level",
    VideoPlayerContext,
  );

  const getQualities = useCallback(
    () =>
      new Promise((res, rej) => {
        const state = context.state;
        if (state.levels) {
          res(state.levels);
          return;
        }
        const url = src;
        if (!url) {
          rej(Error("not found url"));
          return;
        }
        const qualities: any = [];
        let baseUrl = url.split(".m3u8")[0];
        const lastSlashIndex = baseUrl.lastIndexOf("/");
        baseUrl = baseUrl.substring(0, lastSlashIndex + 1);
        fetch(url)
          .then((r) => r.text())
          .then((text) => {
            const lines = (text || "").split("\n");
            for (let i = 0; i < lines.length; i++) {
              const line = lines[i];
              const len = qualities.length;
              if (line.indexOf("#EXT-X-STREAM-INF") === 0) {
                try {
                  const resolution: string[] = line
                    .split(",")
                    .filter(
                      (param) =>
                        param.toUpperCase().indexOf("RESOLUTION=") === 0,
                    );
                  if (resolution.length === 1) {
                    qualities[len] = {
                      level: resolution[0].split("=")[1].split("x")[1],
                    };
                  }
                } catch (exp) {
                  rej(exp);
                  break;
                }
              } else if (qualities[len - 1] && !qualities[len - 1].url) {
                qualities[len - 1].url = baseUrl + line;
              }
            }
            state.levels = qualities;
            res(qualities);
          });
      }),
    [context.state, src],
  );

  const getLevels = useCallback(() => {
    const state = context.state;
    if (!context.hls) {
      return state.levels?.map((level) => ({ height: level.level }));
    }
    return context.hls?.levels.filter((item) =>
      qualities.length ? qualities.includes(item.height) : true,
    );
  }, [context.hls, context.state, qualities]);

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

  useEffect(() => {
    getQualities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    getLevels,
    getCurrentLevel,
    changeLevel,
    currentLevel: levelState.subject,
  };
};
