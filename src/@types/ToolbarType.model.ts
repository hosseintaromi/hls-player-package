export type ChangeRangeSelectType = {
  calcInputVal: (e: number, updateParent: boolean) => void;
  setVideoSlider: React.Dispatch<React.SetStateAction<number>>;
  videoSlider: number;
};
