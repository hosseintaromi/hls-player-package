import React, { useState } from "react";
import Video from "../../player/Video";
import { Gradient, PlayIconWrapper } from "../../player/VideoPlayerStyle";
import Toolbar from "../../toolbar/Toolbar";
import TouchContainer from "../../player/TouchContainer";
import Play from "../../tools/Play";
import Loading from "../../general/Loading";

const PlayerTemplate = () => (
  <>
    <PlayIconWrapper isClicked={false}>
      <Play />
    </PlayIconWrapper>
    <Loading />
    <TouchContainer>
      <Video />
    </TouchContainer>
    <Gradient className="controlled-tool" />
    <Toolbar />
  </>
);

export default PlayerTemplate;
