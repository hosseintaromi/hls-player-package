export type RangePropsType = {
  min: number;
  max: number;
  step: number;
  onMouseEnter?: any;
  onMouseLeave?: any;
  onRangeMove?: (e: any) => void;
  onRangeStart?: (e: any) => void;
  onRangeEnd?: (e: any) => void;
  onTouchMove?: (e: any) => void;
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
