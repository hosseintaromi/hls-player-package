// import { StyleType } from "../@types/player.model";

// export const defaultStyle: StyleType = {
//   bufferBg: "rgba(255,255,255,.4)",
//   dir: "rtl",
//   iconColor: "#ffffff",
//   rangeBackBg: "rgba(255,255,255,.2)",
//   rangeFrontBg: "#f00",
//   settingBg: "rgba(28,28,28,.9)",
//   settingBgHover: "rgb(40 40 39 / 60%)",
//   settingFontSize: "12px",
//   settingTextColor: "#eee",
//   toolbarBg: "linear-gradient(rgba(0,0,0, .0), rgba(0, 0, 0, .5))",
//   toolbarFontSize: "red",
// };

// declare module "@emotion/react" {
//   export interface Theme extends StyleType {}
// }

import { StyleType } from "../@types/player.model";

export const defaultStyle: StyleType = {
  bufferBg: "rgba(255,255,255,.4)",
  dir: "rtl",
  iconColor: "#ffffff",
  rangeBackBg: "rgba(255,255,255,.2)",
  rangeFrontBg: "#f00",
  settingBg: "rgba(0, 0, 0, 0.5)",
  settingBgHover: "rgb(40 40 39 / 60%)",
  settingFontSize: "14px",
  settingTextColor: "#7b7b7b",
  settingTitleTextColor: "#fff",
  toolbarBg: "linear-gradient(rgba(0,0,0, .0), rgba(0, 0, 0, .5))",
  toolbarFontSize: "red",
};

declare module "@emotion/react" {
  export interface Theme extends StyleType {}
}
