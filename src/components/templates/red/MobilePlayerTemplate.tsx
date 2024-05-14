import { useState } from "react";
import Video from "../../player/Video";
import { MobileGradient } from "../../player/VideoPlayerStyle";
import TouchContainer from "../../player/TouchContainer";
import Loading from "../../general/Loading";
import MobileToolbar from "../../toolbar/MobileToolbar";

const MobilePlayerTemplate = () => (
  <>
    <Loading />
    <TouchContainer>
      <Video />
      <MobileGradient className="controlled-tool" />
      <MobileToolbar />
    </TouchContainer>
  </>
);

export default MobilePlayerTemplate;
