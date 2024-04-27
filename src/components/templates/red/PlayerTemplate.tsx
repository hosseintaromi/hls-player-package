import React, { useState } from "react";
import Video from "../../player/Video";
import { Gradient, PlayIconWrapper } from "../../player/VideoPlayerStyle";
import Toolbar from "../../toolbar/Toolbar";
import TouchContainer from "../../player/TouchContainer";
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
      <TouchContainer
        canPlayOnClick
        onShow={(show: boolean) => {
          setIsFadeOut(!show);
        }}
      >
        <Video />
      </TouchContainer>
      <Gradient isFaded={isFadeOut} />
      <Toolbar isFaded={isFadeOut} />
    </>
  );
};

export default PlayerTemplate;
