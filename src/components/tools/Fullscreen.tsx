import React from "react";
import Icon from "../icons/Icon";
import { useFullScreen } from "../../hooks/useFullScreen";
import { useSignal } from "../../hooks/useSignal";

const Fullscreen = () => {
  const video_wrapper_id = document.getElementById("video_wrapper_id");
  const video_player = document.getElementById("video_player");

  const { toggleFullScreen, isFullscreen } = useFullScreen(
    video_wrapper_id,
    video_player,
  );

  const $isFullScreen = useSignal(isFullscreen);

  return (
    <Icon
      className="vp-icon-fullscreen"
      isClickable
      onClick={() => toggleFullScreen()}
      type={!$isFullScreen ? "fullScreen" : "unFullScreen"}
    />
  );
};

export default Fullscreen;
