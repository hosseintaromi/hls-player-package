import RangeSelect from "../general/range-select/RangeSelect";
import { GeneralStyleForRange } from "./MediaTimeLineStyle";
import BufferIndicator from "./BufferIndicator";
import ProgressBar from "./ProgressBar";
import SeekThumb from "./SeekThumb";
import SnapshotPreview from "./SnapshotPreview";

const TimeLine = () => (
  <GeneralStyleForRange className="media-timeLine controlled-tool">
    <RangeSelect max={100} min={0} step={0.1} />
    <SeekThumb />
    <ProgressBar />
    <BufferIndicator />
    <SnapshotPreview />
  </GeneralStyleForRange>
);

export default TimeLine;
