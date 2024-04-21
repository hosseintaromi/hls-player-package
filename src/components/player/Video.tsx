import React, { useEffect, useRef, useState } from "react";
import { useVideo } from "../../hooks/useVideo";
import styled from "@emotion/styled";

const VideoTag = styled.video({
  width: "100%",
  height: "100%",
  display: "block",
  backgroundColor: "#000",
});

const SubtitleTag = styled.div({
  position: "absolute",
  color: "#fff",
  bottom: "120px",
  textAlign: "center",
  width: "100%",
  padding: "5px",
  display: "none",
  "&.on": {
    display: "block",
  },
  "&.off": {
    display: "none",
  },
});

const Video = () => {
  const {
    setVideoRef,
    config: { autoPlay, muted },
  } = useVideo();

  const videoElRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setVideoRef?.(videoElRef.current!);
  }, []);

  return (
    <>
      <VideoTag
        ref={videoElRef}
        autoPlay={autoPlay}
        playsInline
        muted={muted}
        id="video_player"
        crossOrigin="anonymous"
      ></VideoTag>
      <SubtitleTag className="subtitle">
        <div className="text"></div>
      </SubtitleTag>
    </>
  );
};

export default Video;
