export type RangePropsType = {
  min: number;
  max: number;
  step: number;
  onMouseMove: (e: React.MouseEvent<HTMLInputElement>) => void;
  onTouchMove: (e: React.TouchEvent<HTMLInputElement>) => void;
  onTouchStart: (e: React.TouchEvent<HTMLInputElement>) => void;
  onTouchEnd: (e: React.TouchEvent<HTMLInputElement>) => void;
  onMouseDown: (e: React.MouseEvent<HTMLInputElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLInputElement>) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLInputElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLInputElement>) => void;
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
