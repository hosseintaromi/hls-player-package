import { useCallback, useEffect, useState } from "react";
import { KeyValue } from "../@types";
import { useVideo } from "./useVideo";

export const useSpeed = () => {
  const { config, state, getVideoRef } = useVideo();

  const [speed, setSpeed] = useState<KeyValue | undefined>(state.currentSpeed);

  const getSpeeds = useCallback(() => state.speeds, [state.speeds]);

  const changeSpeed = (index: number) => {
    const videoRef = getVideoRef();
    if (videoRef) {
      const speeds = getSpeeds();
      if (speeds) {
        videoRef.playbackRate = speeds[index].value;
        setSpeed((state.currentSpeed = speeds[index]));
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
    }
  };

  useEffect(() => {
    setSpeed(state.currentSpeed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { initSpeeds, changeSpeed, getSpeeds, speed };
};
