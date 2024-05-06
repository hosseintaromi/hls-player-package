import React, { memo, useRef, useState } from "react";
import styled from "@emotion/styled";
import { values } from "lodash-es";
import RangeSelect from "../general/range-select/RangeSelect";
import { VolumeWrapper } from "../toolbar/ToolbarStyle";
import Icon from "../icons/Icon";
import { useVolume } from "../../hooks/useVolume";
import { useSignal } from "../../hooks/useSignal";
import SeekThumb from "../timeline/SeekThumb";
import ProgressBar from "../timeline/ProgressBar";
import { useUpdate } from "../../hooks/useUpdate";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";

const VolumeComponent = ({
  volume,
  handleClick,
  isMute,
}: {
  volume: number;
  handleClick: () => void;
  isMute?: boolean;
}) => {
  const getVolumeIcon = () => {
    if (volume <= 1 || isMute) {
      return "mute";
    }
    if (volume >= 66) return "volumeUp";
    if (volume < 66 && volume >= 1) return "volumeDown";
  };
  const volumeIcon = getVolumeIcon();

  if (volumeIcon)
    return (
      <Icon
        isClickable
        {...{
          type: volumeIcon,
        }}
        onClick={handleClick}
      />
    );
  return <></>;
};

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

  const { changeVolume, changeMute, isMute, currentVolume } = useVolume();
  const rangeValue = useUpdate(100, "volume-range", VideoPlayerContext);
  const $isMute = useSignal(isMute);
  const $currentVolume = useSignal(currentVolume);

  const volume = $currentVolume !== undefined ? $currentVolume * 100 : 100;

  const mute = () => {
    changeMute(!$isMute);
    if (!$isMute) {
      rangeValue.update(0);
    } else {
      rangeValue.update(volume);
    }
  };

  const changeVol = (e: number) => {
    changeVolume(e / 100);
  };

  return (
    <VolumeWrapper
      className="controlled-tool"
      gap={volumeVisibility}
      onMouseEnter={() => setVolumeVisibility(true)}
      onMouseLeave={() => setVolumeVisibility(false)}
    >
      <VolumeComponent handleClick={mute} isMute={$isMute} volume={volume} />
      <RangeSelectWrapper visible>
        <RangeSelect
          step={1}
          min={0}
          max={100}
          defaultValue={100}
          updateKey="volume-range"
          onChange={changeVol}
        />
      </RangeSelectWrapper>
    </VolumeWrapper>
  );
});

export default Volume;
