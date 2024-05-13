import { useBuffer } from "./useBuffer";
import { useVideo } from "./useVideo";
import { useFn } from "./useFn";

export const useTime = () => {
  const { checkBuffer } = useBuffer();
  const { getVideoRef, setTime } = useVideo();

  const changeTime = useFn((time: number) => {
    const el = getVideoRef();
    if (el) {
      el.currentTime = time;
      setTime(el);
    }
  });

  const increaseTime = useFn((time: number) => {
    const el = getVideoRef();
    if (el) el.currentTime += time;
    checkBuffer(true);
  });

  const decreaseTime = useFn((time: number) => {
    const el = getVideoRef();
    if (el) el.currentTime -= time;
    checkBuffer(true);
  });

  const getDuration = useFn(() => {
    const el = getVideoRef();
    return el?.duration;
  });

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
