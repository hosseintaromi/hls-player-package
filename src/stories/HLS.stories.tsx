import { useEffect } from "react";
import { Meta, Story } from "@storybook/react";
import VideoPlayer from "../components/player/VideoPlayer";
import { usePlayer } from "../hooks";
import "./general.css";

type DemoProps = {
  length: number;
};

const Demo = ({ length }: DemoProps) => {
  const playerConfig = usePlayer({
    onUpdateTime: (e) => {
      // console.log('client', e)
    },
    speeds: [0.5, 1, 1.25, 1.5, 2],
    // qualities: [252, 432],
    audioTracks: ["English"],
    subTitle: [
      {
        url: "https://gotranscript.com/samples/captions-example.srt",
        code: "English",
        title: "انگلیسی",
        is_selected: true,
      },
    ],
    keyControl: true,
    theme: "Blue",
    defaultQuality: "252",
    locale: {
      setting_menu_change_speed_title: "انتخاب سرعت پخش",
      setting_menu_change_quality_title: "انتخاب کیفیت",
      setting_menu_quality_list_item_auto: "خودکار (بر اساس اینترنت شما)",
      setting_menu_quality_active_list: "خودکار",
      setting_menu_change_audio_track_title: "انتخاب صدا",
      setting_menu_change_subtitle: "انتخاب زیرنویس",
      setting_menu_subtitle_off: "خاموش",
      can_skip_text: "رد کردن تبلیغ پس از ",
      skip_text: "رد کردن تبلیغ",
    },
    thumbnail:
      "https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/thumbnails/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.vtt",
    // ads: [
    //   {
    //     src: "https://quickframe.com/wp-content/uploads/2022/09/Aveeno_eCom-Example_Max-Glow-SerumPrimer.mp4",
    //     startTime: 4,
    //     canSkip: true,
    //     skipTime: 2,
    //   },
    // ],
    showToolbarOnAd: false,
    // startTime: 4,
    // style: {
    //   bufferBg: 'blue',
    //   dir: 'rtl',
    //   iconColor: 'blue',
    //   rangeBackBg: 'blue',
    //   rangeFrontBg: 'blue',
    //   settingBg: 'blue',
    //   settingFontSize: '15px',
    //   toolbarBg: 'blue',
    //   toolbarFontSize: '60px',
    //   settingBgHover: '',
    //   settingTextColor: "",
    //   settingTitleTextColor: ''
    // },
    autoPlay: true,
    timeForHideEl: 5000,
    type: "HLS",
    // icons: {pa
    //   arrow: <p>hello</p>,
    //   audioTrack: <p>hello</p>,
    //   checkMark: <p>hello</p>,
    //   fullScreen: <p>hello</p>,
    //   mute: <p>hello</p>,
    //   pause: <p>hello</p>,
    //   picInPic: <p>hello</p>,
    //   picOutPic: <p>hello</p>,
    //   play: <p>hello</p>,
    //   quality: <p>hello</p>,
    //   setting: <p>hello</p>,
    //   speed: <p>hello</p>,
    //   subtitle: <p>hello</p>,
    //   unFullScreen: <p>hello</p>,
    //   volumeDown: <p>hello</p>,
    //   volumeUp: <p>hello</p>,
    // }
  });

  useEffect(() => {
    // setTimeout(() => {
    // 	playerConfig.src && playerConfig.loadVideo(playerConfig.src);
    // }, 4000);
  }, []);
  return (
    <VideoPlayer
      config={playerConfig}
      src="https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
    />
  );
};

const meta: Meta = {
  title: "base",
  component: Demo,
  argTypes: {
    length: {
      control: {
        type: "number",
      },
      defaultValue: 10,
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DemoProps> = (args) => <Demo length={22} />;
export const Default = Template.bind({});
