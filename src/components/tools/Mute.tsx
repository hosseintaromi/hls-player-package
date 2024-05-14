import Icon from "../icons/Icon";
import { useVolume } from "../../hooks/useVolume";
import { useSignal } from "../../hooks/useSignal";

const Mute = () => {
  const { changeMute, isMute } = useVolume();
  const $isMute = useSignal(isMute);

  const mute = () => {
    changeMute(!$isMute);
  };

  if ($isMute) {
    return (
      <Icon
        id="mute"
        isClickable
        type="mute"
        onClick={mute}
        className="controlled-tool"
      />
    );
  }
  return (
    <Icon
      isClickable
      id="volumeUp"
      type="volumeUp"
      onClick={mute}
      className="controlled-tool"
    />
  );
};

export default Mute;
