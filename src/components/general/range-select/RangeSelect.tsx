import { memo, useState } from "react";
import { GeneralStyleForRange, Slider, TimeLine } from "./RangeSelectStyle";
import { RangePropsType } from "../../../@types/RangeSelectType.model";
import { useSensitiveArea } from "../../../hooks/useSensitiveArea";
import SeekThumb from "./SeekThumb";
import ProgressBar from "./ProgressBar";

const TimeLineMemo = memo(() => <TimeLine className="timeline" />);

const RangeSelect = ({
  min,
  max,
  step,
  value = 0,
  onChange,
  onMouseMove,
  onTouchMove,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
}: RangePropsType) => {
  const [rangeValue, setRangeValue] = useState(value);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(+e.target.value);
    onChange?.(+e.target.value);
  };

  return (
    <>
      <GeneralStyleForRange>
        <Slider
          type="range"
          step={step}
          min={min}
          max={max}
          value={rangeValue}
          onChange={change}
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
          onMouseDown={(e) => {
            onMouseDown?.(e);
          }}
          onMouseUp={(e) => {
            onMouseUp?.(e);
          }}
        />
        <TimeLineMemo />
        <SeekThumb value={rangeValue} />
        <ProgressBar value={rangeValue} />
      </GeneralStyleForRange>
    </>
  );
};

export default RangeSelect;
