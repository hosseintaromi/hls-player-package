import React, { useState } from "react";
import Video from "../../player/Video";
import { MobileGradient } from "../../player/VideoPlayerStyle";
import TouchContainer from "../../player/TouchContainer";
import Loading from "../../general/Loading";
import MobileToolbar from "../../toolbar/MobileToolbar";

const MobilePlayerTemplate = () => {
  const [isFadeOut, setIsFadeOut] = useState<boolean>(false);
  return (
    <>
      <Loading />
      <TouchContainer
        canPlayOnClick
        onShow={(show: boolean) => {
          setIsFadeOut(!show);
        }}
      >
        <Video />
        <MobileGradient isFaded={isFadeOut} />
        <MobileToolbar isFaded={isFadeOut} />
      </TouchContainer>
    </>
  );
};

export default MobilePlayerTemplate;
