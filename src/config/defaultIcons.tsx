import React from "react";
import { IconsType } from "../@types/player.model";
import ArrowRight from "../components/icons/icon-list/ArrowRight";
import AudioIcon from "../components/icons/icon-list/AudioIcon";
import ChangeQuality from "../components/icons/icon-list/ChangeQuality";
import CheckMark from "../components/icons/icon-list/CheckMark";
import ExitFullScreenIcon from "../components/icons/icon-list/ExitFullScreenIcon";
import FullScreenIcon from "../components/icons/icon-list/FullScreenIcon";
import HighVolume from "../components/icons/icon-list/HighVolume";
import LowVolume from "../components/icons/icon-list/LowVolume";
import MuteVolume from "../components/icons/icon-list/MuteVolume";
import PauseIcon from "../components/icons/icon-list/PauseIcon";
import PictureInPicture from "../components/icons/icon-list/PictureInPicture";
import PictureOutPicture from "../components/icons/icon-list/PictureOutPicture";
import PlayIcon from "../components/icons/icon-list/PlayIcon";
import PlaybackSpeed from "../components/icons/icon-list/PlaybackSpeed";
import SettingIcon from "../components/icons/icon-list/SettingIcon";
import Subtitle from "../components/icons/icon-list/Subtitle";
import AutoPlayOne from "../components/icons/icon-list/AutoPlayOne";
import AutoPlayOff from "../components/icons/icon-list/AutoPlayOff";
import JumpBack from "../components/icons/icon-list/JumpBack";
import JumpForward from "../components/icons/icon-list/JumpForward";
import Mic from "../components/icons/icon-list/Mic";

export const defaultIcons: IconsType = {
    setting: <SettingIcon />,
    checkMark: <CheckMark />,
    arrow: <ArrowRight />,
    play: <PlayIcon />,
    pause: <PauseIcon />,
    volumeUp: <HighVolume />,
    volumeDown: <LowVolume />,
    mute: <MuteVolume />,
    picInPic: <PictureInPicture />,
    picOutPic: <PictureOutPicture />,
    fullScreen: <FullScreenIcon />,
    unFullScreen: <ExitFullScreenIcon />,
    speed: <PlaybackSpeed />,
    quality: <ChangeQuality />,
    subtitle: <Subtitle />,
    audioTrack: <AudioIcon />,
    autoPlayOn: <AutoPlayOne />,
    autoPlayOff: <AutoPlayOff />,
    jumpBack: <JumpBack />,
    jumpForward: <JumpForward />,
    mic: <Mic />,
};
