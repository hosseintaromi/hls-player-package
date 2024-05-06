import RangeSelect from "../general/range-select/RangeSelect";
import { GeneralStyleForRange } from "./MediaTimeLineStyle";
import BufferIndicator from "./BufferIndicator";
import SnapshotPreview from "./SnapshotPreview";
import { useContextEvents } from "../../hooks/useContextEvents";
import { TimeLineEventType } from "../../@types/RangeSelectType.model";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";
import { useTime, useVideo } from "../../hooks";
import { OnUpdateTimeType } from "../../@types";
import { useUpdate } from "../../hooks/useUpdate";

const TimeLine = () => {
  const { call } = useContextEvents<TimeLineEventType>(VideoPlayerContext);
  const rangeValue = useUpdate(0, "range-value", VideoPlayerContext);
  const { changeTime, getDuration } = useTime();
  useVideo({
    onUpdateTime: (e: OnUpdateTimeType) => {
      rangeValue.update(+e.percentage);
    },
  });

  const onChange = (value: number) => {
    const videoDuration = getDuration?.();
    if (videoDuration) {
      changeTime((value * videoDuration) / 100);
    }
  };

  return (
    <GeneralStyleForRange className="media-timeLine controlled-tool">
      <RangeSelect
        updateKey="range-value"
        max={100}
        min={0}
        step={0.1}
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
      />

      <BufferIndicator />
      <SnapshotPreview />
    </GeneralStyleForRange>
  );
};

export default TimeLine;
