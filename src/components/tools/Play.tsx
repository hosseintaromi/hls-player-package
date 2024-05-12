import { useVideo } from "../../hooks/useVideo";
import Icon from "../icons/Icon";
import { useSignal } from "../../hooks/useSignal";

const Play = () => {
  const { changePlayPause, isPlay } = useVideo();
  const $isPlay = useSignal(isPlay);

  console.log("isPlay", $isPlay);

  const togglePlay = () => {
    changePlayPause(!$isPlay);
  };

  return (
    <>
      {$isPlay === true ? (
        <Icon
          isSensitive
          isClickable
          onClick={togglePlay}
          type="pause"
          className="vp-icon-pause controlled-tool"
        />
      ) : (
        <Icon
          isClickable
          isSensitive
          onClick={togglePlay}
          type="play"
          className="vp-icon-play controlled-tool"
        />
      )}
    </>
  );
};

export default Play;
