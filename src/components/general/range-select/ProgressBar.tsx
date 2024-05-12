import { useRef } from "react";
import { ProgressBarStyle } from "./RangeSelectStyle";

const ProgressBar = ({ value }: { value: number }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  console.log(value, "ProgressBar");
  if (progressBarRef.current)
    progressBarRef.current.style.width = `calc(${value}%)`;

  return <ProgressBarStyle ref={progressBarRef} />;
};

export default ProgressBar;
