import { RangePropsType } from "../@types/RangeSelectType.model";

export const useRangeSelect = (props: Omit<RangePropsType, "setRange">) => {
  return props as RangePropsType;
};
