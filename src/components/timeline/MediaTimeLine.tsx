import { useRef, useState } from "react";
import RangeSelect from "../general/range-select/RangeSelect";
import { GeneralStyleForRange } from "./MediaTimeLineStyle";
import BufferIndicator from "./BufferIndicator";
import SnapshotPreview from "./SnapshotPreview";
import { useContextEvents } from "../../hooks/useContextEvents";
import { TimeLineEventType } from "../../@types/RangeSelectType.model";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";
import { useTime, useVideo } from "../../hooks";
import { OnUpdateTimeType } from "../../@types";
import { useSensitiveArea } from "../../hooks/useSensitiveArea";

const TimeLine = () => {
  const [rangeValue, setRangeValue] = useState<number>(0);
  const sensitiveRef = useSensitiveArea();
  const { changeTime, getDuration } = useTime();
  const { changePlayPause, getIsPlay } = useVideo({
    onUpdateTime: (e: OnUpdateTimeType) => {
      setRangeValue(+e.percentage);
    },
  });

  const isPlay = useRef(getIsPlay());

  const { call } = useContextEvents<TimeLineEventType>(VideoPlayerContext);

  const onChange = (value: number) => {
    const videoDuration = getDuration?.();
    if (videoDuration) {
      changeTime((value * videoDuration) / 100);
    }
  };

  return (
    <GeneralStyleForRange
      className="media-timeLine controlled-tool"
      ref={sensitiveRef}
    >
      <RangeSelect
        max={100}
        min={0}
        step={0.1}
        value={rangeValue}
        onChange={onChange}
        onMouseMove={(e) => {
          call.onTimeLineMouseMove?.(e);
        }}
        onTouchMove={(e) => {
          call.onTimeLineTouchMove?.(e);
        }}
        onEnter={(e) => {
          call.onTimeLineEnter?.(e);
        }}
        onLeave={(e) => {
          call.onTimeLineLeave?.(e);
        }}
        onMouseDown={() => {
          isPlay.current = getIsPlay();
          changePlayPause(false);
        }}
        onMouseUp={() => changePlayPause(!!isPlay.current)}
      />

      <BufferIndicator />
      <SnapshotPreview />
    </GeneralStyleForRange>
  );
};

export default TimeLine;
