import RangeSelect from "../general/range-select/RangeSelect";
import { GeneralStyleForRange } from "./MediaTimeLineStyle";
import BufferIndicator from "./BufferIndicator";
import SnapshotPreview from "./SnapshotPreview";
import { useContextEvents } from "../../hooks/useContextEvents";
import { TimeLineEventType } from "../../@types/RangeSelectType.model";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";

const TimeLine = () => {
  const { call } = useContextEvents<TimeLineEventType>(VideoPlayerContext);
  return (
    <GeneralStyleForRange className="media-timeLine controlled-tool">
      <RangeSelect
        max={100}
        min={0}
        step={0.1}
        onMouseMove={(e) => {
          call.onTimeLineMouseMove?.(e);
        }}
        onTouchMove={(e) => {
          call.onTimeLineTouchMove?.(e);
        }}
        onTouchStart={(e) => {
          call.onTimeLineTouchStart?.(e);
        }}
        onTouchEnd={(e) => {
          call.onTimeLineTouchEnd?.(e);
        }}
        onMouseDown={(e) => {
          call.onTimeLineMouseDown?.(e);
        }}
        onMouseUp={(e) => {
          call.onTimeLineMouseUp?.(e);
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
