import React, { ReactNode, useEffect, useState } from "react";
import { useVideo } from "../../hooks/useVideo";
import Icon from "../icons/Icon";

const Play = ({ children }: { children?: ReactNode }) => {
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const { changePlayPause, getIsPlay } = useVideo({
    onPlayPause: (play: boolean) => {
      console.log("play", play);
      setIsPlay(play);
    },
  });

  const togglePlay = () => {
    changePlayPause(!isPlay);
  };

  useEffect(() => {
    const isPlay = getIsPlay();
    if (isPlay) setIsPlay(isPlay);
  }, []);

  return (
    <>
      {isPlay === true ? (
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
