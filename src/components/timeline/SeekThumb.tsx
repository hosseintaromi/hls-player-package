import { useRef } from "react";
import { Thumb } from "../general/range-select/RangeSelectStyle";
import { useTimeLine } from "../../hooks/useTimeLine";
import { UseUpdateSubjectType } from "../../hooks/useUpdate";
import { useSignal } from "../../hooks/useSignal";

const SeekThumb = ({ value }: { value: UseUpdateSubjectType<number> }) => {
  const thumbRef = useRef<HTMLDivElement>(null);
  console.log(value);
  const $currentValue = useSignal(value);

  if (thumbRef.current)
    thumbRef.current.style.left = `calc(${$currentValue}% - 9px)`;

  // useTimeLine({
  //   onTimeLineChange: (e: string) => {
  //     if (thumbRef.current) thumbRef.current.style.left = `calc(${e}% - 9px)`;
  //   },
  // });

  return <Thumb ref={thumbRef} />;
};

export default SeekThumb;
