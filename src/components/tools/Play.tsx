import React from "react";
import { useVideo } from "../../hooks/useVideo";
import Icon from "../icons/Icon";
import { useSignal } from "../../hooks/useSignal";

const Play = () => {
  const { changePlayPause, isPlay } = useVideo();
  const $isPlay = useSignal(isPlay);

  const togglePlay = () => {
    changePlayPause(!$isPlay);
  };

  return (
    <>
      {$isPlay === true ? (
        <Icon
          isClickable
          onClick={togglePlay}
          type="pause"
          className="vp-icon-pause"
        />
      ) : (
        <Icon
          isClickable
          onClick={togglePlay}
          type="play"
          className="vp-icon-play"
        />
      )}
    </>
  );
};

export default Play;
