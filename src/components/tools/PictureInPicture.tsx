import Icon from "../icons/Icon";
import { useVideo } from "../../hooks";

const PictureInPicture = () => {
  const { getVideoRef } = useVideo();
  const togglePictureInPicture = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      (getVideoRef() as HTMLVideoElement).requestPictureInPicture();
    }
  };

  return (
    <Icon
      className="controlled-tool"
      isClickable
      type="picInPic"
      onClick={togglePictureInPicture}
    />
  );
};

export default PictureInPicture;
