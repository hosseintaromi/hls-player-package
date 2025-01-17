import { memo, useState } from "react";
import styled from "@emotion/styled";
import RangeSelect from "../general/range-select/RangeSelect";
import { VolumeWrapper } from "../toolbar/ToolbarStyle";
import Icon from "../icons/Icon";
import { useVolume } from "../../hooks/useVolume";
import { useSignal } from "../../hooks/useSignal";
import { useRangeSelect } from "../../hooks/useRangeSelect";

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
  const $isMute = useSignal(isMute);
  const $currentVolume = useSignal(currentVolume);

  const volume = $currentVolume !== undefined ? $currentVolume * 100 : 100;

  const rangeConfig = useRangeSelect({
    step: 1,
    min: 0,
    max: 100,
    value: volume,
    onChange: (value) => {
      changeVolume(value / 100);
    },
  });

  const mute = () => {
    changeMute(!$isMute);
    if (!$isMute) {
      rangeConfig.setRange(0);
    } else {
      rangeConfig.setRange(volume);
    }
  };

  return (
    <VolumeWrapper
      className="controlled-tool"
      gap={volumeVisibility}
      onMouseEnter={() => setVolumeVisibility(true)}
      onMouseLeave={() => setVolumeVisibility(false)}
    >
      <VolumeComponent handleClick={mute} isMute={$isMute} volume={volume} />
      <RangeSelectWrapper visible={volumeVisibility}>
        <RangeSelect config={rangeConfig} />
      </RangeSelectWrapper>
    </VolumeWrapper>
  );
});

export default Volume;
