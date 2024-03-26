import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import Video from "../../player/Video";
import {
  MobileGradient,
  MobileVideoWrapper,
} from "../../player/VideoPlayerStyle";
import { usePlayerContext } from "../../../hooks/usePlayerContext";
import TouchContainer from "../../player/TouchContainer";
import Loading from "../../loading/Loading";
import MobileToolbar from "../../toolbar/MobileToolbar";

const MobilePlayerTemplate = () => {
  const [isFadeOut, setIsFadeOut] = useState<boolean>(false);
  const { style } = usePlayerContext();
  return (
    <ThemeProvider theme={style}>
      <MobileVideoWrapper id="video_wrapper_id">
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
      </MobileVideoWrapper>
    </ThemeProvider>
  );
};

export default MobilePlayerTemplate;
