import { useCallback, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useVideo } from "../../hooks/useVideo";
import { useTime } from "../../hooks";

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
    togglePlayPause,
    config: { autoPlay, muted, keyControl },
  } = useVideo();
  const { increaseTime, decreaseTime } = useTime();

  const videoElRef = useRef<HTMLVideoElement>(null);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!keyControl) return;
      if (e.key === "ArrowRight") increaseTime(10);
      if (e.key === "ArrowLeft") decreaseTime(10);
      if (e.key === "Enter") {
        togglePlayPause();
      }
    },
    [decreaseTime, increaseTime, keyControl, togglePlayPause],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  useEffect(() => {
    setVideoRef?.(videoElRef.current!);
  }, [setVideoRef]);

  return (
    <>
      <VideoTag
        ref={videoElRef}
        autoPlay={autoPlay}
        playsInline
        muted={muted}
        crossOrigin="anonymous"
      />
      <SubtitleTag className="subtitle">
        <div dir="auto" className="text" />
      </SubtitleTag>
    </>
  );
};

export default Video;
