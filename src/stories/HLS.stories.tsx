import { Meta, Story } from "@storybook/react";
import VideoPlayer from "../components/player/VideoPlayer";
import { usePlayer } from "../hooks";
import "./general.css";
import { useInit } from "../hooks/useInit";

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
    loop: false,
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
    startTime: 100,
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

  useInit(() => {
    // setTimeout(() => {
    //   playerConfig.src &&
    //     playerConfig.loadVideo(
    //       "https://cdn.bitmovin.com/content/assets/sintel/hls/playlist.m3u8",
    //       "HLS",
    //       0,
    //     );
    // }, 4000);
  });
  return (
    <VideoPlayer
      config={playerConfig}
      // src="https://cdn.bitmovin.com/content/assets/sintel/hls/playlist.m3u8"
      // src="https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
      // src="https://vodrbstreamer2.iranlms.ir/play/st5/6624ce027f49b48565c44603/playlist.m3u8?token=BiVUbya8T3RRkH6g9QxWO5TOA7_dOBMZAU5XOAU3s+AjpkPSBRmon0w_zOYZ5gBcOj3g3SJvIB__weNncDvMZZBpfuAxWw2ZE3HV5hWPGOIbP6e3X5049zmZMtYnexXIecr5XpqAp+6D2T6w2iWUgK6XLzFo2jE+ZkrCdz8BSWO3zxBu_Y9CTFxosBCbjx8r0X5GduXjKiitUtggjo0u4TX58x3_Ra8LupQfXQ9cwVtEW0KjO2gmOKUOTl658kCcFgWKY4in0+82zXXLxe0PewYUBtSn+rHoSnR0xahWq6a6KH32tOl5aSXcAN69+uyt0Wmk072Tu1Kjoob6pXSrDpJGF2k4GIUwyT5zl3poPIPo+gEE0CTZXcXzzzmQdhxnQaHFu+vdX8soEJfpE3KfU4X1__T+pM8zREG6E2kah8VHPPYes9W4rgfSJviVXTFPrndrjyqb4CQc6gugGl5V+TItiZ5r6AYOj0n3QQN8IKKi4qJgTtsLjEUx6uJsIDY9k6chblkn4hu0eeZYC5xJLlaR_ZCRPVnQ89Dwk7DvmFs-"
      src="https://vodrbstreamer2.iranlms.ir/play/st5/6624cdf97f49b48565c41a33/playlist.m3u8?token=C2dzuIoWIdVhrSfM8xJe0U5dRCKv3Nye5QlNZwte71xd63bGmPaWTOyuel6BWOYhuZxaCBJoJ5njNFfYif1sEWVRF81lGm4aQujflIPDlOeVdS_G2CYaioL0yDJ6iksfw2r3cYEzPMWy9eF3YM3_r1AhvbxTOXg6T0JDtcyAtV8Er95W7hQle+SaCtZOYZihVMAd2GikYiP6yhG2q2BZP1kaJ34pAQXzFTyckmon1LNnufAHIXPrqGOyUaZ1MznfMcxrNDtYoTM8ICiBlvaF9KNW_5HIIhQzhkUfSQZCYWerzBENNKFT4Hme4QzpTtLJwwCaCfB944aH214FXMQkQ8ajRmhGI96Y8irFlVuq5b+sHruI+hEzfc0lWCgzzrc4Wm6HwSBNtx7vHjVGm0N0NJFy8MHySKIISYSyuf3u4IU_4I0J_zYL5YrRrxFtpuxBZcfr9xnRGaFykCS3uymQ71CmNdETdnCHI99RjKhYVxDGaPl1Yfm8kYVr0U1HOncbWT4djPS4VK9rZC3wTnXv5ngZBUxnCrLaDirkmVav2Ro-"
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
