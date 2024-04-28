import React, {
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  GeneralStyleForRange,
  ProgressBar,
  Slider,
  Thumb,
  TimeLine,
} from "./RangeSelectStyle";
import { RangePropsType } from "../../../@types/RangeSelectType.model";
import { useSensitiveArea } from "../../../hooks/useSensitiveArea";

const TimeLineMemo = memo(() => <TimeLine className="timeline" />);

const RangeSelect = ({
  min,
  max,
  controllerRef,
  onChangeCallback,
  step,
  onRangeMove,
  onRangeEnd,
  onRangeStart,
}: RangePropsType) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const selectorRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const generalRef = useRef<HTMLDivElement>(null);

  const { setSensitive } = useSensitiveArea();

  const toggleThumb = () => {
    if (selectorRef.current) {
      const preDisplay = selectorRef.current.style.display;
      selectorRef.current.style.display =
        preDisplay === "block" ? "none" : "block";
    }
  };

  const calcInputVal = useCallback(
    (e: number, updateParent: boolean) => {
      if (updateParent && onChangeCallback) onChangeCallback(e);
      setCurrentValue(+e);
      if (selectorRef.current && progressBarRef.current) {
        selectorRef.current.style.left = `calc(${e}% - 9px)`;
        progressBarRef.current.style.width = `calc(${e}%)`;
      }
    },
    [onChangeCallback],
  );

  useImperativeHandle(controllerRef, () => ({
    calcInputVal,
    toggleThumb,
  }));

  const calcThrottle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      calcInputVal(+e.target.value, true);
    },
    [calcInputVal],
  );

  const onTouchMove = (e: React.TouchEvent<HTMLInputElement>) => {
    if (!onRangeMove) return;
    const rect = (e.target as any).getBoundingClientRect();
    (e as any).offsetX = e.touches[0].clientX - window.pageXOffset - rect.left;
    onRangeMove(e);
  };

  useEffect(() => {
    if (generalRef.current) setSensitive(generalRef.current);
  }, [setSensitive]);

  return (
    <GeneralStyleForRange ref={generalRef}>
      <Slider
        type="range"
        step={step}
        min={min}
        max={max}
        value={currentValue}
        onChange={calcThrottle}
        onMouseMove={onRangeMove}
        onTouchMove={onTouchMove}
        onTouchStart={onRangeStart}
        onTouchEnd={onRangeEnd}
        onMouseDown={onRangeStart}
        onMouseUp={onRangeEnd}
      />
      <ProgressBar className="vp-progress" ref={progressBarRef} />

      <Thumb className="vp-thumb" ref={selectorRef} />

      <TimeLineMemo />
    </GeneralStyleForRange>
  );
};

export default RangeSelect;
