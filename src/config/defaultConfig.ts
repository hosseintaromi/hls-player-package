import { PlayerInstance } from "../@types/player.model";
import { defaultIcons } from "./defaultIcons";
import { defaultLocale } from "./defaultLang";
import { defaultStyle } from "./defaultStyle";

export const defaultConfig: PlayerInstance = {
  locale: defaultLocale,
  icons: defaultIcons,
  loop: false,
  speeds: [0.5, 0.75, 1, 1.5, 2],
  style: defaultStyle,
  autoPlay: true,
  timeForHideEl: 4000,
  type: "HLS",
  theme: "Red",
  qualities: [],
  audioTracks: [],
  subTitle: [],
  keyControl: true,
  loadVideo(): void {},
  changeLocale(): void {},
  thumbnail: "",
  muted: false,
};
