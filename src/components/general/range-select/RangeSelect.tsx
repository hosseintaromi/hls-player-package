import { memo, useCallback } from "react";
import { GeneralStyleForRange, Slider, TimeLine } from "./RangeSelectStyle";
import { RangePropsType } from "../../../@types/RangeSelectType.model";
import { useSensitiveArea } from "../../../hooks/useSensitiveArea";
import VideoPlayerContext from "../../../contexts/VideoPlayerContext";
import SeekThumb from "./SeekThumb";
import ProgressBar from "./ProgressBar";
import { useUpdate } from "../../../hooks/useUpdate";

const TimeLineMemo = memo(() => <TimeLine className="timeline" />);

const RangeSelect = ({
  min,
  max,
  step,
  updateKey,
  defaultValue = 0,
  onChange,
  onMouseMove,
  onTouchMove,
  onMouseEnter,
  onMouseLeave,
}: RangePropsType) => {
  const sensitiveRef = useSensitiveArea();
  const rangeValue = useUpdate(defaultValue, updateKey, VideoPlayerContext);

  const calcThrottle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      rangeValue.update(+e.target.value);
      onChange?.(+e.target.value);
    },
    [onChange, rangeValue],
  );

  return (
    <>
      <GeneralStyleForRange ref={sensitiveRef}>
        <Slider
          type="range"
          step={step}
          min={min}
          max={max}
          defaultValue={defaultValue}
          onChange={calcThrottle}
          onMouseMove={(e) => {
            onMouseMove?.(e);
          }}
          onTouchMove={(e) => {
            onTouchMove?.(e);
          }}
          onMouseEnter={(e) => {
            onMouseEnter?.(e);
          }}
          onMouseLeave={(e) => {
            onMouseLeave?.(e);
          }}
        />
        <TimeLineMemo />
        <SeekThumb value={rangeValue.subject} />
        <ProgressBar value={rangeValue.subject} />
      </GeneralStyleForRange>
    </>
  );
};

export default RangeSelect;
