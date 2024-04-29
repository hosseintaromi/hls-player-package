import React, { memo, useCallback, useRef, useState } from "react";
import { GeneralStyleForRange, Slider, TimeLine } from "./RangeSelectStyle";
import {
  RangePropsType,
  TimeLineEventType,
} from "../../../@types/RangeSelectType.model";
import { useSensitiveArea } from "../../../hooks/useSensitiveArea";
import VideoPlayerContext from "../../../contexts/VideoPlayerContext";
import { useTime, useVideo } from "../../../hooks";
import { useContextEvents } from "../../../hooks/useContextEvents";
import { OnUpdateTimeType } from "../../../@types";

const TimeLineMemo = memo(() => <TimeLine className="timeline" />);

const RangeSelect = ({ min, max, step }: RangePropsType) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const playStateRef = useRef<boolean>();

  const { changeTime, getDuration } = useTime();
  const sensitiveRef = useSensitiveArea();
  const { call } = useContextEvents<TimeLineEventType>(VideoPlayerContext);

  const { getIsPlay, changePlayPause } = useVideo({
    onUpdateTime: (e: OnUpdateTimeType) => {
      setCurrentValue(+e.percentage);
    },
  });

  const calcThrottle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const videoDuration = getDuration?.();
      if (videoDuration) changeTime((+e.target.value * videoDuration) / 100);
      call.onTimeLineChange?.(+e.target.value);
    },
    [call, changeTime, getDuration],
  );

  const onRangeStart = () => {
    const isPlay = (playStateRef.current = getIsPlay());
    if (isPlay) changePlayPause(false);
  };

  const onRangeEnd = () => {
    if (playStateRef.current) changePlayPause(true);
  };

  return (
    <>
      <GeneralStyleForRange ref={sensitiveRef}>
        <Slider
          type="range"
          step={step}
          min={min}
          max={max}
          value={currentValue}
          onChange={calcThrottle}
          onMouseMove={(e) => {
            call.onTimeLineMouseMove?.(e);
          }}
          onTouchMove={(e) => {
            call.onTimeLineTouchMove?.(e);
          }}
          onTouchStart={(e) => {
            onRangeStart?.();
            call.onTimeLineTouchStart?.(e);
          }}
          onTouchEnd={(e) => {
            onRangeEnd?.();
            call.onTimeLineTouchEnd?.(e);
          }}
          onMouseDown={(e) => {
            onRangeStart?.();
            call.onTimeLineMouseDown?.(e);
          }}
          onMouseUp={(e) => {
            onRangeEnd?.();
            call.onTimeLineMouseUp?.(e);
          }}
          onMouseEnter={(e) => {
            call.onTimeLineMouseEnter?.(e);
          }}
          onMouseLeave={(e) => {
            call.onTimeLineMouseLeave?.(e);
          }}
        />
        <TimeLineMemo />
      </GeneralStyleForRange>
    </>
  );
};

export default RangeSelect;
