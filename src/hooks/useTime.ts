import { useCallback } from "react";
import { useBuffer } from "./useBuffer";
import { useVideo } from "./useVideo";

export const useTime = () => {
  const { checkBuffer } = useBuffer();
  const { getVideoRef } = useVideo();

  const changeTime = (time: number) => {
    const el = getVideoRef();
    if (el) el.currentTime = time;
    checkBuffer(true);
  };

  const increaseTime = useCallback(
    (time: number) => {
      const el = getVideoRef();
      if (el) el.currentTime += time;
      checkBuffer(true);
    },
    [checkBuffer, getVideoRef],
  );

  const decreaseTime = useCallback(
    (time: number) => {
      const el = getVideoRef();
      if (el) el.currentTime -= time;
      checkBuffer(true);
    },
    [checkBuffer, getVideoRef],
  );

  const getDuration = () => {
    const el = getVideoRef();
    return el?.duration;
  };

  const getCurrentTime = () => {
    const el = getVideoRef();
    return el?.currentTime;
  };

  return {
    changeTime,
    increaseTime,
    decreaseTime,
    getDuration,
    getCurrentTime,
  };
};
