import { useRef } from "react";
import { ProgressBarStyle } from "../general/range-select/RangeSelectStyle";
import { useTimeLine } from "../../hooks/useTimeLine";

const ProgressBar = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useTimeLine({
    onTimeLineChange: (e: string) => {
      if (progressBarRef.current)
        progressBarRef.current.style.width = `calc(${e}%)`;
    },
  });

  return <ProgressBarStyle ref={progressBarRef} />;
};

export default ProgressBar;
