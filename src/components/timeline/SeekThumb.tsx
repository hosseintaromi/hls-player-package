import { useRef } from "react";
import { Thumb } from "../general/range-select/RangeSelectStyle";
import { useVideo } from "../../hooks";
import { OnUpdateTimeType } from "../../@types";
import { useTimeLine } from "../../hooks/useTimeLine";

const SeekThumb = () => {
  const thumbRef = useRef<HTMLDivElement>(null);

  useTimeLine({
    onTimeLineChange: (e: string) => {
      if (thumbRef.current) thumbRef.current.style.left = `calc(${e}% - 9px)`;
    },
  });
  // useVideo({
  //   onUpdateTime: (e: OnUpdateTimeType) => {
  //     if (thumbRef.current)
  //       thumbRef.current.style.left = `calc(${e.percentage}% - 9px)`;
  //   },
  // });

  return <Thumb ref={thumbRef} />;
};

export default SeekThumb;
