import Icon from "../icons/Icon";
import { useSignal } from "../../hooks/useSignal";
import { useVideo } from "../../hooks";
import { useFullScreen } from "../../hooks/useFullScreen";

const Fullscreen = () => {
  const { getVideoRef, getVideoWrapperRef } = useVideo();
  const { toggleFullScreen, isFullscreen } = useFullScreen(
    getVideoWrapperRef(),
    getVideoRef() || null,
  );
  const $isFullScreen = useSignal(isFullscreen);

  return (
    <Icon
      className="vp-icon-fullscreen controlled-tool"
      isClickable
      onClick={() => toggleFullScreen()}
      type={!$isFullScreen ? "fullScreen" : "unFullScreen"}
    />
  );
};

export default Fullscreen;
