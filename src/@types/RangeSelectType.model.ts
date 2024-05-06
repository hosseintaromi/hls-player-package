export type RangePropsType = {
  min: number;
  max: number;
  step: number;
  updateKey: string;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onMouseMove?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onTouchMove?: (e: React.TouchEvent<HTMLInputElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLInputElement>) => void;
};

export type TimeLineEventType = {
  onTimeLineMouseMove: "onTimeLineMouseMove";
  onTimeLineMouseLeave: "onTimeLineMouseLeave";
  onTimeLineMouseEnter: "onTimeLineMouseEnter";
  onTimeLineTouchMove: "onTimeLineTouchMove";
};
