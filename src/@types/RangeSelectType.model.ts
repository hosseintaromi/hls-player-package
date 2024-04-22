export type RangePropsType = {
  min: number;
  max: number;
  controllerRef?: any;
  onChangeCallback?: any;
  step: number;
  onMouseEnter?: any;
  onMouseLeave?: any;
  onRangeMove?: (e: any) => void;
  onRangeStart?: (e: any) => void;
  onRangeEnd?: (e: any) => void;
};
