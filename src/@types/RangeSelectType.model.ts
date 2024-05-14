export type RangePropsType = {
  min: number;
  max: number;
  step: number;
  value?: number;
  onChange?: (value: number) => void;
  onMouseMove?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onTouchMove?: (e: React.TouchEvent<HTMLInputElement>) => void;
  onEnter?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onLeave?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLInputElement>) => void;
};

export type TimeLineEventType = {
  onTimeLineMouseMove: "onTimeLineMouseMove";
  onTimeLineTouchMove: "onTimeLineTouchMove";
  onTimeLineLeave: "onTimeLineLeave";
  onTimeLineEnter: "onTimeLineEnter";
};
