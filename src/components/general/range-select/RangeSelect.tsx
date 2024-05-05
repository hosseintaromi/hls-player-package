import React, { memo, useCallback, useRef, useState } from "react";
import { GeneralStyleForRange, Slider, TimeLine } from "./RangeSelectStyle";
import { RangePropsType } from "../../../@types/RangeSelectType.model";
import { useSensitiveArea } from "../../../hooks/useSensitiveArea";
import VideoPlayerContext from "../../../contexts/VideoPlayerContext";
import { useTime, useVideo } from "../../../hooks";
import { OnUpdateTimeType } from "../../../@types";
import SeekThumb from "../../timeline/SeekThumb";
import ProgressBar from "../../timeline/ProgressBar";
import { useUpdate } from "../../../hooks/useUpdate";

const TimeLineMemo = memo(() => <TimeLine className="timeline" />);

const RangeSelect = ({
  min,
  max,
  step,
  onMouseMove,
  onTouchMove,
  onTouchStart,
  onTouchEnd,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  onMouseLeave,
}: RangePropsType) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const playStateRef = useRef<boolean>();

  const { changeTime, getDuration } = useTime();
  const sensitiveRef = useSensitiveArea();
  const { getIsPlay, changePlayPause } = useVideo({
    onUpdateTime: (e: OnUpdateTimeType) => {
      setCurrentValue(+e.percentage);
    },
  });
  const rangeValue = useUpdate(currentValue, "range-value", VideoPlayerContext);

  console.log(rangeValue);

  const calcThrottle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const videoDuration = getDuration?.();
      if (videoDuration) changeTime((+e.target.value * videoDuration) / 100);
      // call.onTimeLineChange?.(+e.target.value);
      rangeValue.update(+e.target.value);
    },
    [changeTime, getDuration, rangeValue],
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
            onMouseMove(e);
          }}
          onTouchMove={(e) => {
            onTouchMove(e);
          }}
          onTouchStart={(e) => {
            onRangeStart?.();
            onTouchStart(e);
          }}
          onTouchEnd={(e) => {
            onRangeEnd?.();
            onTouchEnd(e);
          }}
          onMouseDown={(e) => {
            onRangeStart?.();
            onMouseDown(e);
          }}
          onMouseUp={(e) => {
            onRangeEnd?.();
            onMouseUp(e);
          }}
          onMouseEnter={(e) => {
            onMouseEnter(e);
          }}
          onMouseLeave={(e) => {
            onMouseLeave?.(e);
          }}
        />
        <TimeLineMemo />
        <SeekThumb value={rangeValue.subject} />
        <ProgressBar />
      </GeneralStyleForRange>
    </>
  );
};

export default RangeSelect;
