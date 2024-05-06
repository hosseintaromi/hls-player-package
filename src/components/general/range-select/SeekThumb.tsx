import { useRef } from "react";
import { Thumb } from "./RangeSelectStyle";
import { UseUpdateSubjectType } from "../../../hooks/useUpdate";
import { useSignal } from "../../../hooks/useSignal";

const SeekThumb = ({ value }: { value: UseUpdateSubjectType<number> }) => {
  const thumbRef = useRef<HTMLDivElement>(null);
  const $currentValue = useSignal(value);

  if (thumbRef.current)
    thumbRef.current.style.left = `calc(${$currentValue}% - 9px)`;

  return <Thumb ref={thumbRef} />;
};

export default SeekThumb;
