import React from 'react';
import { Meta, Story } from '@storybook/react';
import VideoPlayer from '../components/player/VideoPlayer';
import { usePlayer } from '../hooks';
import './general.css'

type DemoProps = {
  length: number;
};

const Demo = ({ length }: DemoProps) => {
  const playerConfig = usePlayer({
    onUpdateTime: (e) => {
      // console.log('client', e)
    },
    speeds: [0.5, 1, 1.25, 1.5, 2],
    locale: {
      setting_menu_change_speed_title: 'انتخاب سرعت پخش',
      setting_menu_change_quality_title: 'انتخاب کیفیت',
      setting_menu_quality_list_item_auto: 'خودکار (بر اساس اینترنت شما)',
      setting_menu_quality_active_list: 'خودکار',
      setting_menu_change_audio_track_title: 'انتخاب صدا',
      setting_menu_change_subtitle: 'انتخاب زیرنویس',
      setting_menu_subtitle_off: 'خاموش'
    },
    // style: {
    //   bufferBg: 'blue',
    //   dir: 'rtl',
    //   iconColor: 'blue',
    //   rangeBackBg: 'blue',
    //   rangeFrontBg: 'blue',
    //   settingBg: 'blue',
    //   settingFontSize: 'blue',
    //   textColor: 'blue',
    //   toolbarBg: 'blue',
    //   toolbarFontSize: 'blue',
    // },

    autoPlay: true,
    timeForHideEl: 10000,
    type: 'MP4'
    // icons: {
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
  })
  return (
    <VideoPlayer config={playerConfig} src="https://file-examples.com/storage/fed2530f4765780b09aff74/2017/04/file_example_MP4_1280_10MG.mp4" />
  );
};

const meta: Meta = {
  title: 'mp4',
  component: Demo,
  argTypes: {
    length: {
      control: {
        type: 'number',
      },
      defaultValue: 10,
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DemoProps> = args => (
  <Demo length={22} />
);
export const Default = Template.bind({});