import { useRef } from "react";
import styled from "@emotion/styled";
import { useVideo } from "../../hooks/useVideo";
import { useTime } from "../../hooks";
import { useFn } from "../../hooks/useFn";
import { useInit } from "../../hooks/useInit";

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
    config: { autoPlay, muted, keyControl, videoTogglePlay },
  } = useVideo();

  const { increaseTime, decreaseTime } = useTime();

  const videoElRef = useRef<HTMLVideoElement>(null);

  const onKeyDown = useFn((e: KeyboardEvent) => {
    if (!keyControl) return;
    switch (e.key) {
      case " ":
        togglePlayPause();
        break;
      case "ArrowRight":
        increaseTime(10);
        break;
      case "ArrowLeft":
        decreaseTime(10);
        break;
    }
  });

  const onClick = useFn(() => {
    if (videoElRef.current && videoTogglePlay) {
      videoElRef.current.onclick = () => {
        togglePlayPause();
      };
    }
  });

  useInit(() => {
    setVideoRef?.(videoElRef.current!);
    onClick();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

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
