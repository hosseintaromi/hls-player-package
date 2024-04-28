import React, { useCallback, useRef } from "react";
import { Global, ThemeProvider, css } from "@emotion/react";
import PlayerTemplate from "../templates/red/PlayerTemplate";
import { PlayerInstance, PlayerState } from "../../@types/player.model";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";
import PlayerInitializer from "../tools/PlayerInitializer";
import MobilePlayerTemplate from "../templates/red/MobilePlayerTemplate";
import BlueTemplate from "../templates/blue/BlueTemplate";
import { VideoWrapperStyle } from "./VideoPlayerStyle";
import { GlobalStyles } from "./GlobalStyles";

const PlayerTemplateSelector = ({
  config,
}: {
  config: PlayerInstance | undefined;
}) => {
  if (config?.theme === "Blue") {
    return <BlueTemplate />;
  }

  return window.innerWidth < 768 ? (
    <MobilePlayerTemplate />
  ) : (
    <PlayerTemplate />
  );
};

const VideoPlayer = ({
  children,
  config,
  src,
}: {
  children?: React.ReactNode;
  config?: PlayerInstance;
  src?: string;
}) => {
  const playerStateRef = useRef<PlayerState>({} as any);
  const configRef = useRef<PlayerInstance>(config || ({ src } as any));
  const listenOnLoad = useRef<(() => void)[]>([]);
  const videoRef = useRef<HTMLVideoElement>();
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  const setVideoRef = (ref: HTMLVideoElement) => {
    videoRef.current = ref;
  };
  const getVideoRef = useCallback(() => videoRef.current, []);

  if (config && src) {
    config.src = src;
  }

  return (
    <VideoPlayerContext.Provider
      value={{
        getVideoRef,
        setVideoRef,
        config: configRef.current,
        listenOnLoad: listenOnLoad.current,
        state: playerStateRef.current,
        getVideoWrapperRef: () => videoWrapperRef.current,
      }}
    >
      <GlobalStyles />
      <ThemeProvider theme={config?.style || {}}>
        <VideoWrapperStyle ref={videoWrapperRef}>
          <>
            {children ? (
              { children }
            ) : (
              <PlayerTemplateSelector config={config} />
            )}
          </>
        </VideoWrapperStyle>
      </ThemeProvider>
      <PlayerInitializer />
    </VideoPlayerContext.Provider>
  );
};

export default VideoPlayer;
