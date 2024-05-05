import { useRef } from "react";
import { useTimeLine } from "./useTimeLine";

type TimeLineConfigType = {
  onTimeLineChange: (t: string) => void;
  onTimeLineMouseDown: (e: any) => void;
  onTimeLineMouseEnter: (e: any) => void;
  onTimeLineMouseLeave: (e: any) => void;
  onTimeLineMouseMove: (e: any) => void;
  onTimeLineMouseUp: (e: any) => void;
  onTimeLineTouchEnd: (e: any) => void;
  onTimeLineTouchMove: (e: any) => void;
  onTimeLineTouchStart: (e: any) => void;
};

export const useSlider = (sliderConfig: TimeLineConfigType) => {
  // const playerDefaults: PlayerInstance = {
  //   ...defaultConfig,
  //   ...sliderConfig,
  // };

  useTimeLine({
    onTimeLineChange: sliderConfig.onTimeLineChange,
    onTimeLineMouseDown: sliderConfig.onTimeLineMouseDown,
    onTimeLineMouseEnter: sliderConfig.onTimeLineMouseEnter,
    onTimeLineMouseLeave: sliderConfig.onTimeLineMouseLeave,
    onTimeLineMouseMove: sliderConfig.onTimeLineMouseMove,
    onTimeLineMouseUp: sliderConfig.onTimeLineMouseUp,
    onTimeLineTouchEnd: sliderConfig.onTimeLineTouchEnd,
    onTimeLineTouchMove: sliderConfig.onTimeLineTouchMove,
    onTimeLineTouchStart: sliderConfig.onTimeLineTouchStart,
  });

  const configRef = useRef<TimeLineConfigType>(sliderConfig);

  return configRef.current;
};
