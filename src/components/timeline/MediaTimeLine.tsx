import { useRef } from "react";
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
import { useDisableSelection } from "../../hooks/useDisableSelection";
import { useRangeSelect } from "../../hooks/useRangeSelect";

const TimeLine = () => {
  useDisableSelection();

  const sensitiveRef = useSensitiveArea();
  const { changeTime, getDuration } = useTime();
  const { changePlayPause, getIsPlay } = useVideo();
  const { call } = useContextEvents<TimeLineEventType>(VideoPlayerContext);

  const isPlay = useRef(getIsPlay());

  const onChange = (value: number) => {
    const videoDuration = getDuration?.();
    if (videoDuration) {
      changeTime((value * videoDuration) / 100);
    }
  };

  const rangeConfig = useRangeSelect({
    max: 100,
    min: 0,
    step: 0.1,
    value: 0,
    onChange,
    onMouseMove: (e: any) => {
      call.onTimeLineMouseMove?.(e);
    },
    onTouchMove: (e: any) => {
      call.onTimeLineTouchMove?.(e);
    },
    onEnter: (e: any) => {
      call.onTimeLineEnter?.(e);
    },
    onLeave: (e: any) => {
      call.onTimeLineLeave?.(e);
    },
    onMouseDown: () => {
      isPlay.current = getIsPlay();
      changePlayPause(false);
    },
    onMouseUp: () => changePlayPause(!!isPlay.current),
  });

  useVideo({
    onUpdateTime: (e: OnUpdateTimeType) => {
      rangeConfig.setRange(+e.percentage);
    },
  });

  return (
    <GeneralStyleForRange
      className="media-timeLine controlled-tool"
      ref={sensitiveRef}
    >
      <RangeSelect config={rangeConfig} />

      <BufferIndicator />
      <SnapshotPreview />
    </GeneralStyleForRange>
  );
};

export default TimeLine;
