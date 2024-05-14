import { memo, useEffect, useRef, useState } from "react";
import { GeneralStyleForRange, Slider, TimeLine } from "./RangeSelectStyle";
import { RangePropsType } from "../../../@types/RangeSelectType.model";
import SeekThumb from "./SeekThumb";
import ProgressBar from "./ProgressBar";
import { useFn } from "../../../hooks/useFn";
import { useInit } from "../../../hooks/useInit";

const TimeLineMemo = memo(() => <TimeLine className="timeline" />);

const RangeSelect = ({
  min,
  max,
  step,
  value = 0,
  onChange,
  onMouseMove,
  onTouchMove,
  onEnter,
  onLeave,
  onMouseDown,
  onMouseUp,
}: RangePropsType) => {
  const [rangeValue, setRangeValue] = useState(value);
  const rangeRef = useRef<any>(null);
  const mouseDownRef = useRef<boolean>(false);

  const getProgress = useFn((e: any) => {
    const bounds = rangeRef.current.getBoundingClientRect();
    const touch = e.touches?.[e.touches.length - 1];
    const x = (e.clientX || touch.clientX) - bounds.left;
    const value = (x / bounds.width) * 100;
    e.progress = Math.max(0, Math.min(100, Math.ceil(value * 10) / 10));
    return e.progress;
  });

  const setMove = useFn((e: any) => {
    const progress = getProgress(e);
    if (mouseDownRef.current) {
      setRangeValue(progress);
      onChange?.(progress);
    }
  });

  const onTouchEnd = (e: any) => {
    const progress = getProgress(e);
    setRangeValue(progress);
    onChange?.(progress);
  };

  useInit(() => {
    const setMouseUp = () => {
      mouseDownRef.current = false;
    };
    window.addEventListener("mouseup", setMouseUp);
    window.addEventListener("touchend", setMouseUp);
    return () => {
      window.removeEventListener("mouseup", setMouseUp);
      window.removeEventListener("touchend", setMouseUp);
    };
  });

  useEffect(() => {
    setRangeValue(value);
  }, [value]);

  return (
    <>
      <GeneralStyleForRange>
        <Slider
          ref={rangeRef}
          type="range"
          step={step}
          min={min}
          max={max}
          defaultValue={value}
          onMouseMove={(e) => {
            setMove?.(e);
            onMouseMove?.(e);
          }}
          onTouchMove={(e) => {
            setMove?.(e);
            onTouchMove?.(e);
          }}
          onMouseEnter={(e) => {
            onEnter?.(e);
          }}
          onMouseLeave={(e) => {
            onLeave?.(e);
          }}
          onMouseDown={(e) => {
            mouseDownRef.current = true;
            onMouseDown?.(e);
          }}
          onMouseUp={(e) => {
            onTouchEnd(e);
            onMouseUp?.(e);
          }}
          onTouchEnd={(e) => {
            onTouchEnd(e);
            onMouseUp?.(e as any);
          }}
          onTouchStart={(e) => {
            mouseDownRef.current = true;
            onMouseDown?.(e as any);
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
