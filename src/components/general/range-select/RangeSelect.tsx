import { memo, useEffect, useRef } from "react";
import {
  GeneralStyleForRange,
  ProgressBarStyle,
  Slider,
  Thumb,
  TimeLine,
} from "./RangeSelectStyle";
import { RangePropsType } from "../../../@types/RangeSelectType.model";
import { useFn } from "../../../hooks/useFn";
import { useInit } from "../../../hooks/useInit";
import { setRefStyle } from "../../../utils/ui-utils";

const TimeLineMemo = memo(() => <TimeLine className="timeline" />);

const RangeSelect = ({
  config,
}: {
  config: Exclude<RangePropsType, "setRange">;
}) => {
  const {
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
    setRange,
  } = config;
  const rangeRef = useRef<any>(null);
  const mouseDownRef = useRef<boolean>(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const getProgress = useFn((e: any) => {
    const bounds = rangeRef.current.getBoundingClientRect();
    const touch =
      e.touches?.[e.touches.length - 1] ||
      e.changedTouches?.[e.changedTouches?.length - 1];
    const x = (e.clientX || touch.clientX) - bounds.left;
    const value = (x / bounds.width) * 100;
    e.progress = Math.max(0, Math.min(100, Math.ceil(value * 10) / 10));
    return e.progress;
  });

  const setRangeValue = (value: number) => {
    setRefStyle(thumbRef, { left: `calc(${value}% - 4.5px)` });
    setRefStyle(progressBarRef, { width: `calc(${value}%)` });
  };

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
    config.setRange = (value) => {
      setRangeValue(value);
    };
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
        <Thumb ref={thumbRef} />
        <ProgressBarStyle ref={progressBarRef} />
      </GeneralStyleForRange>
    </>
  );
};

export default RangeSelect;
