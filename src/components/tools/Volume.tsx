import React, { memo, useRef, useState } from "react";
import styled from "@emotion/styled";
import RangeSelect from "../general/range-select/RangeSelect";
import { VolumeWrapper } from "../toolbar/ToolbarStyle";
import Icon from "../icons/Icon";
import { useVolume } from "../../hooks/useVolume";
import { useSignal } from "../../hooks/useSignal";

type ChangeRangeSelectType = {
  calcInputVal: (e: number, updateParent: boolean) => void;
};

const RangeSelectWrapper = styled.div(
  {
    transition:
      "margin .2s cubic-bezier(0,0,.2,1),width .2s cubic-bezier(0,0,.2,1)",
  },
  ({ visible }: { visible: boolean }) => ({
    opacity: visible ? 1 : 0,
    width: visible ? "80px" : "0",
    marginRight: visible ? "22px !important" : "0 !important",
  }),
);

const Volume = memo(() => {
  const [volumeVisibility, setVolumeVisibility] = useState<boolean>(false);

  const controllerRef = useRef<ChangeRangeSelectType>({
    calcInputVal: () => {},
  });

  const { changeVolume, changeMute, isMute, currentVolume } = useVolume();
  const $isMute = useSignal(isMute);
  const $currentVolume = useSignal(currentVolume);

  const volume = $currentVolume !== undefined ? $currentVolume * 100 : 100;

  const mute = () => {
    changeMute(!$isMute);
    if (!$isMute) {
      controllerRef.current.calcInputVal(0, false);
    } else {
      controllerRef.current.calcInputVal(volume, false);
    }
  };

  const changeVol = (e: number) => {
    changeVolume(e / 100);
  };

  const calcVolumeIcon = () => {
    if (volume <= 1 || $isMute) {
      return <Icon isClickable type="mute" onClick={mute} />;
    }
    if (volume >= 66)
      return <Icon isClickable type="volumeUp" onClick={mute} />;
    if (volume < 66 && volume >= 1)
      return <Icon isClickable type="volumeDown" onClick={mute} />;
  };

  return (
    <VolumeWrapper
      className="controlled-tool"
      gap={volumeVisibility}
      onMouseEnter={() => setVolumeVisibility(true)}
      onMouseLeave={() => setVolumeVisibility(false)}
    >
      {calcVolumeIcon()}
      <RangeSelectWrapper visible={volumeVisibility}>
        <RangeSelect
          step={1}
          min={0}
          max={100}
          controllerRef={controllerRef}
          onChangeCallback={changeVol}
        />
      </RangeSelectWrapper>
    </VolumeWrapper>
  );
});

export default Volume;
