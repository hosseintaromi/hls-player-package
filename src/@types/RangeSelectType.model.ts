export type RangePropsType = {
  min: number;
  max: number;
  step: number;
};

export type TimeLineEventType = {
  onTimeLineChange: "onTimeLineChange";
  onTimeLineMouseDown: "onTimeLineMouseDown";
  onTimeLineMouseMove: "onTimeLineMouseMove";
  onTimeLineMouseLeave: "onTimeLineMouseLeave";
  onTimeLineMouseEnter: "onTimeLineMouseEnter";
  onTimeLineMouseUp: "onTimeLineMouseUp";
  onTimeLineTouchStart: "onTimeLineTouchStart";
  onTimeLineTouchMove: "onTimeLineTouchMove";
  onTimeLineTouchEnd: "onTimeLineTouchEnd";
};
