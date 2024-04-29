import React, { memo, useCallback, useState } from "react";
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

const RangeSelect = ({
  min,
  max,
  step,
  onRangeMove,
  onRangeEnd,
  onRangeStart,
  onTouchMove: onTouchMove2,
  onMouseEnter,
  onMouseLeave,
}: RangePropsType) => {
  const [currentValue, setCurrentValue] = useState<number>(0);

  const { changeTime, getDuration } = useTime();
  const sensitiveRef = useSensitiveArea();
  const { call } = useContextEvents<TimeLineEventType>(VideoPlayerContext);

  useVideo({
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

  const onTouchMove = (e: React.TouchEvent<HTMLInputElement>) => {
    if (!onRangeMove) return;
    const rect = (e.target as any).getBoundingClientRect();
    (e as any).offsetX = e.touches[0].clientX - window.pageXOffset - rect.left;
    onRangeMove(e);
    onTouchMove2?.(e);
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
            onRangeMove?.(e);
            call.onTimeLineMouseMove?.(e);
          }}
          onTouchMove={(e) => {
            onTouchMove?.(e);
            call.onTimeLineTouchMove?.(e);
          }}
          onTouchStart={(e) => {
            onRangeStart?.(e);
            call.onTimeLineTouchStart?.(e);
          }}
          onTouchEnd={(e) => {
            onRangeEnd?.(e);
            call.onTimeLineTouchEnd?.(e);
          }}
          onMouseDown={(e) => {
            onRangeStart?.(e);
            call.onTimeLineMouseDown?.(e);
          }}
          onMouseUp={(e) => {
            onRangeEnd?.(e);
            call.onTimeLineMouseUp?.(e);
          }}
          onMouseEnter={(e) => {
            onMouseEnter?.(e);
            call.onTimeLineMouseEnter?.(e);
          }}
          onMouseLeave={(e) => {
            onMouseLeave?.(e);
            call.onTimeLineMouseLeave?.(e);
          }}
        />
        <TimeLineMemo />
      </GeneralStyleForRange>
    </>
  );
};

export default RangeSelect;
