import React from "react";
import Icon from "../icons/Icon";
import { useVolume } from "../../hooks/useVolume";
import { useSignal } from "../../hooks/useSignal";

const Mute = () => {
  const { changeMute, isMute, currentVolume } = useVolume();
  const $isMute = useSignal(isMute);
  const $currentVolume = useSignal(currentVolume);

  const mute = () => {
    changeMute(!$isMute);
  };

  const calcVolumeIcon = () => {
    if (($currentVolume || 100) * 100 <= 1 || $isMute) {
      return <Icon isClickable type="mute" onClick={() => mute()} />;
    }
    if (($currentVolume || 100) * 100 >= 66)
      return <Icon isClickable type="volumeUp" onClick={() => mute()} />;
    return <Icon isClickable type="volumeDown" onClick={() => mute()} />;
  };

  return calcVolumeIcon();
};

export default Mute;
