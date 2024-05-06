import { useRef } from "react";
import { ProgressBarStyle } from "./RangeSelectStyle";
import { useTimeLine } from "../../../hooks/useTimeLine";
import { UseUpdateSubjectType } from "../../../hooks/useUpdate";
import { useSignal } from "../../../hooks/useSignal";

const ProgressBar = ({ value }: { value: UseUpdateSubjectType<number> }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const $currentValue = useSignal(value);

  if (progressBarRef.current)
    progressBarRef.current.style.width = `calc(${$currentValue}%)`;

  return <ProgressBarStyle ref={progressBarRef} />;
};

export default ProgressBar;
