import React from "react";
import Icon from "../icons/Icon";
import { useVolume } from "../../hooks/useVolume";
import { useSignal } from "../../hooks/useSignal";

const Mute = () => {
  const { changeMute, isMute } = useVolume();
  const $isMute = useSignal(isMute);

  const mute = () => {
    changeMute(!$isMute);
  };

  const calcVolumeIcon = () => {
    if ($isMute) {
      return <Icon id="mute" isClickable type="mute" onClick={() => mute()} />;
    }
    return (
      <Icon isClickable id="volumeUp" type="volumeUp" onClick={() => mute()} />
    );
  };

  return calcVolumeIcon();
};

export default Mute;
