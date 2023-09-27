import { ReactNode, RefObject } from "react";
import { ThemeType } from "../theme";

export type ControllerRefType = {
  changeSpeed: (value: number) => void;
  play: (value: boolean) => void;
};

export type VideoPlayerPropsType = {
  customTheme?: ThemeType;
  controllerRef?: RefObject<ControllerRefType>;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  src: string;
  poster?: string;
  width?: string;
  height?: string;
  autoPlay?: boolean;
  playIcon?: ReactNode;
  pauseIcon?: ReactNode;
  showPlayIcon?: boolean;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onSeeking?: () => void;
  onSeeked?: () => void;
  onEnd?: () => void;
  topRightContainer?: ReactNode | null;
  topLeftContainer?: ReactNode | null;
};
