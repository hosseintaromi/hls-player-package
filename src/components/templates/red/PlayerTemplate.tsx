import React, { useState } from "react";
import Video from "../../player/Video";
import { Gradient, PlayIconWrapper } from "../../player/VideoPlayerStyle";
import Toolbar from "../../toolbar/Toolbar";
import HideContainer from "../../player/TouchContainer";
import Play from "../../tools/Play";
import Loading from "../../general/Loading";

const PlayerTemplate = () => {
  const [isFadeOut, setIsFadeOut] = useState<boolean>(false);
  return (
    <>
      <PlayIconWrapper isClicked={false}>
        <Play />
      </PlayIconWrapper>
      <Loading />
      <HideContainer
        onShow={(show: boolean) => {
          setIsFadeOut(!show);
        }}
      >
        <Video />
      </HideContainer>
      <Gradient isFaded={isFadeOut} />
      <Toolbar isFaded={isFadeOut} />
    </>
  );
};

export default PlayerTemplate;
