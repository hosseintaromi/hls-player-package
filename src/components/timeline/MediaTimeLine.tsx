import { useEffect, useRef, useState } from "react";
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
  const sensitiveRef = useSensitiveArea();
  const {
    changePlayPause,
    getIsPlay,
    config: { startTime },
  } = useVideo();

  const [rangeValue, setRangeValue] = useState<number>(startTime || 0);

  const isPlay = useRef(getIsPlay());
  const { call } = useContextEvents<TimeLineEventType>(VideoPlayerContext);

  const { changeTime, getDuration } = useTime();
  useVideo({
    onUpdateTime: (e: OnUpdateTimeType) => {
      setRangeValue(+e.percentage);
    },
  });

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
        onMouseEnter={(e) => {
          call.onTimeLineMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          call.onTimeLineMouseLeave?.(e);
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
