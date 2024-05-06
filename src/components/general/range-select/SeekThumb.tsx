import { useRef } from "react";
import { Thumb } from "./RangeSelectStyle";

const SeekThumb = ({ value }: { value: number }) => {
  const thumbRef = useRef<HTMLDivElement>(null);

  if (thumbRef.current) thumbRef.current.style.left = `calc(${value}% - 9px)`;

  return <Thumb ref={thumbRef} />;
};

export default SeekThumb;
