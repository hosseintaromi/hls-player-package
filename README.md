# [Video Player](https://reactjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-Apache-blue.svg)](https://github.com/hosseintaromi/video_player/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/@hosseintaromi/video_player.svg?style=flat)](https://www.npmjs.com/package/@hosseintaromi/video_player) ![NPM Downloads](https://img.shields.io/npm/dw/@hosseintaromi/video_player) [![stars - video_player](https://img.shields.io/github/stars/hosseintaromi/video_player?style=social)](https://github.com/hosseintaromi/video_player)

A video player like YouTube that allows streaming and complete customization
This package lets you play videos in different formats such as m3u8, mp4, or any other form.
As you noticed, this package allows you to stream; we used HLS.
In terms of appearance, we tried to be entirely similar to YouTube because it is standard and popular, but you will not be limited in any way. You can customize all sections individually.

### Key Features

- Ability to stream videos or play simple videos.
- Fully customizable appearance, inspired by YouTube.
- Control over subtitles, dubbing, playback speed, and quality.g, playback speed and quality by default, and access to control all of these in your application.

<!-- You can play a video with all cool features -->

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Key Features](#key-features)
- [Config Object Fields](#config-object-fields)
- [Examples](#examples)
- [Contributing](#contributing)
- [Credits](#credits)
- [Author](#author)
- [License](#license)

## Installation

Install with [npm](https://www.npmjs.com/@hosseintaromi/video_player):

```sh
$ npm i @hosseintaromi/video_player
```

Install with [yarn](https://yarnpkg.com/package?q=%40hosseintaromi&name=%40hosseintaromi%2Fvideo_player):

```sh
$ yarn add @hosseintaromi/video_player
```

## Usage

```tsx
import { VideoPlayer } from "@hosseintaromi/video_player";

const App = () => {
  const playerConfig = usePlayer({
    onUpdateTime: (e) => {
      console.log("client", e);
    },
    speeds: [0.5, 1, 1.25, 1.5, 2],
    qualities: [252, 432],
    audioTracks: ["English"],
    subTitle: ["Chinese"],
    keyControl: true,
    theme: "Blue",
    locale: {
      setting_menu_change_speed_title: "انتخاب سرعت پخش",
      setting_menu_change_quality_title: "انتخاب کیفیت",
      setting_menu_quality_list_item_auto: "خودکار (بر اساس اینترنت شما)",
      setting_menu_quality_active_list: "خودکار",
      setting_menu_change_audio_track_title: "انتخاب صدا",
      setting_menu_change_subtitle: "انتخاب زیرنویس",
      setting_menu_subtitle_off: "خاموش",
    },
    autoPlay: true,
    timeForHideEl: 1000,
    type: "HLS",
  });
  return (
    <VideoPlayer
      config={playerConfig}
      src="https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
    />
  );
};

export default App;
```

## Config

###

### config object type and default value

###

| Field            | Type                                 | Default                  | Description                                                                               |
| ---------------- | ------------------------------------ | ------------------------ | ----------------------------------------------------------------------------------------- |
| `type`           | `"HLS"` or `"MP4"`                   | `"HLS"`                  | Specifies the type of video stream. Use 'HLS' for streaming and 'MP4' for normal videos.  |
| `loop`           | `boolean`                            | `false`                  | Enables video looping after it reaches the end if set to `true`.                          |
| `autoPlay`       | `boolean`                            | `false`                  | Starts playing the video automatically when the player is created.                        |
| `locale`         | `PlayerLocaleType`                   | `{}`                     | Object containing locale strings.                                                         |
| `speeds`         | `number[]`                           | `[0.5, 0.75, 1, 1.5, 2]` | Array of play speeds for the video.                                                       |
| `theme`          | `"Red"` or `"Blue"`                  | `"Blue"`                 | Sets the color theme for the player. Choose between 'Red' and 'Blue'.                     |
| `timeForHideEl`  | `number`                             | `3000`                   | Time in milliseconds to automatically hide page elements.                                 |
| `icons`          | `IconsType`                          | `{}`                     | Object containing ReactNode for various icons.                                            |
| `style`          | `StyleType`                          | `{}`                     | Object containing styles for various player elements.                                     |
| `qualities`      | `number[]`                           | `[]`                     | Specify the qualities to display. If not provided, all available qualities will be shown. |
| `audioTracks`    | `string[]`                           | `[]`                     | Specify the audio tracks to display. If not provided, all available tracks will be shown. |
| `subTitle`       | `string[]`                           | `[]`                     | Specify the subtitles to display. If not provided, all available subtitles will be shown. |
| `keyControl`     | `boolean`                            | `true`                   | Enables key listeners for actions like play/pause (space key) or mute (M key).            |
| `thumbnail`      | `string`                             | `""`                     | Link to the thumbnail image in TTF format.                                                |
| `onUpdateTime`   | `(e: OnUpdateTimeType) => void`      | -                        | Callback function triggered on video time update.                                         |
| `onEnd`          | `(e: OnUpdateTimeType) => void`      | -                        | Callback function triggered when the video reaches the end.                               |
| `onLoading`      | `(e: boolean) => void`               | -                        | Callback function triggered when the video is loading.                                    |
| `onPlayPause`    | `(e: OnUpdateTimeType) => void`      | -                        | Callback function triggered on play/pause events.                                         |
| `onUpdateBuffer` | `(e: number) => void`                | -                        | Callback function triggered on buffer update.                                             |
| `onChangeVolume` | `(e: OnUpdateTimeType) => void`      | -                        | Callback function triggered on volume change.                                             |
| `onChangeMute`   | `(e: boolean) => void`               | -                        | Callback function triggered on mute/unmute events.                                        |
| `onReady`        | `() => void`                         | -                        | Callback function triggered when the player is ready.                                     |
| `src`            | `string`                             | `""`                     | Source URL of the video.                                                                  |
| `loadVideo`      | `(src: string) => void`              | -                        | Function to load a new video source.                                                      |
| `changeLocale`   | `(locale: PlayerLocaleType) => void` | -                        | Function to change the player's locale.                                                   |

###

### style object type and default value

###

| Field                   | Type               | Default | Description                                      |
| ----------------------- | ------------------ | ------- | ------------------------------------------------ |
| `dir`                   | `"rtl"` or `"ltr"` | `"ltr"` | Text direction (right-to-left or left-to-right). |
| `iconColor`             | `string`           | `""`    | Color of icons.                                  |
| `settingTextColor`      | `string`           | `""`    | Color of text in settings menu.                  |
| `toolbarBg`             | `string`           | `""`    | Background color of the toolbar.                 |
| `settingBg`             | `string`           | `""`    | Background color of the settings menu.           |
| `settingBgHover`        | `string`           | `""`    | Background color of the settings menu on hover.  |
| `rangeFrontBg`          | `string`           | `""`    | Background color of the progress bar.            |
| `rangeBackBg`           | `string`           | `""`    | Background color of the progress bar track.      |
| `bufferBg`              | `string`           | `""`    | Background color of the buffer bar.              |
| `settingFontSize`       | `string`           | `""`    | Font size of text in settings menu.              |
| `toolbarFontSize`       | `string`           | `""`    | Font size of text in the toolbar.                |
| `settingTitleTextColor` | `string`           | `""`    | Color of the title text in settings menu.        |

###

### icon object type

###

| Field          | Type        |
| -------------- | ----------- |
| `setting`      | `ReactNode` |
| `checkMark`    | `ReactNode` |
| `arrow`        | `ReactNode` |
| `play`         | `ReactNode` |
| `pause`        | `ReactNode` |
| `volumeUp`     | `ReactNode` |
| `volumeDown`   | `ReactNode` |
| `mute`         | `ReactNode` |
| `picInPic`     | `ReactNode` |
| `picOutPic`    | `ReactNode` |
| `fullScreen`   | `ReactNode` |
| `unFullScreen` | `ReactNode` |
| `speed`        | `ReactNode` |
| `quality`      | `ReactNode` |
| `subtitle`     | `ReactNode` |
| `audioTrack`   | `ReactNode` |
| `autoPlayOn`   | `ReactNode` |
| `autoPlayOff`  | `ReactNode` |
| `jumpBack`     | `ReactNode` |
| `jumpForward`  | `ReactNode` |
| `mic`          | `ReactNode` |

###

### locale object type

###

| Field                                   | Type     | Description                                               |
| --------------------------------------- | -------- | --------------------------------------------------------- |
| `setting_menu_change_speed_title`       | `string` | Title for changing speed in the settings menu.            |
| `setting_menu_change_quality_title`     | `string` | Title for changing quality in the settings menu.          |
| `setting_menu_quality_list_item_auto`   | `string` | Label for the auto quality option in the settings menu.   |
| `setting_menu_quality_active_list`      | `string` | Label for the active quality option in the settings menu. |
| `setting_menu_change_audio_track_title` | `string` | Title for changing audio track in the settings menu.      |
| `setting_menu_change_subtitle`          | `string` | Title for changing subtitle in the settings menu.         |
| `setting_menu_subtitle_off`             | `string` | Label for turning off subtitles in the settings menu.     |

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

## Credits

This software uses the following open source packages:

&nbsp;&middot;&nbsp;
[React](https://react.dev/)
&nbsp;&middot;&nbsp;
[Node.js](https://nodejs.org/)
&nbsp;&middot;&nbsp;
[hls.js](https://github.com/video-dev/hls.js)
&nbsp;&middot;&nbsp;
[emotion](https://emotion.sh/)

## Author

&nbsp;&middot;&nbsp;
[github/HosseinTaromi](https://github.com/hosseintaromi)

&nbsp;&middot;&nbsp;
[linkedin/HosseinTaromi](https://www.linkedin.com/in/hosseintaromi/)

## License

Copyright © 2023, [Hossein Taromi](https://github.com/hosseintaromi).
Released under the [Apache License](LICENSE).
