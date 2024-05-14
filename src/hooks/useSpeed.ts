import { useCallback } from "react";
import { KeyValue } from "../@types";
import { useVideo } from "./useVideo";
import { useUpdate } from "./useUpdate";
import VideoPlayerContext from "../contexts/VideoPlayerContext";

export const useSpeed = () => {
  const { config, state, getVideoRef } = useVideo();
  const speedState = useUpdate(
    state.speeds?.findIndex((sp) => sp.value === 1),
    "speed",
    VideoPlayerContext,
  );

  const getSpeeds = useCallback(() => state.speeds, [state.speeds]);

  const changeSpeed = (index: number) => {
    const videoRef = getVideoRef();
    if (videoRef) {
      const speeds = getSpeeds();
      if (speeds) {
        videoRef.playbackRate = speeds[index].value;
        speedState.update(index);
      }
    }
  };

  const initSpeeds = () => {
    if (!config || !config.speeds) {
      return;
    }
    let speeds: any = config.speeds;

    if (Array.isArray(speeds)) {
      speeds = speeds.map((speed) => ({ key: `${speed}`, value: speed }));
    } else {
      const speedsArr = [];
      for (let key in speeds as any) {
        speedsArr.push({ key, value: speeds[key] });
      }
      speeds = speedsArr;
    }
    state.speeds = [];
    if (speeds) {
      state.speeds = speeds;
      const videoEl = getVideoRef();
      state.currentSpeed = speeds.find(
        (x: KeyValue) => x.value === videoEl?.playbackRate,
      );
      speedState.update(speeds.findIndex((sp: KeyValue) => sp.value === 1));
    }
  };

  return {
    initSpeeds,
    changeSpeed,
    getSpeeds,
    currentSpeed: speedState.subject,
  };
};
