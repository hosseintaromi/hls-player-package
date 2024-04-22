import React, { useRef } from "react";
import PlayerTemplate from "../templates/red/PlayerTemplate";
import { PlayerInstance, PlayerState } from "../../@types/player.model";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";
import PlayerInitializer from "../tools/PlayerInitializer";
import MobilePlayerTemplate from "../templates/red/MobilePlayerTemplate";
import BlueTemplate from "../templates/blue/BlueTemplate";
import CustomPlayer from "../templates/custom/CustomPlayer";

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

  const setVideoRef = (ref: HTMLVideoElement) => {
    videoRef.current = ref;
  };
  const getVideoRef = () => videoRef.current;

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
      }}
    >
      {children ? (
        <CustomPlayer>{children}</CustomPlayer>
      ) : (
        <PlayerTemplateSelector config={config} />
      )}
      <PlayerInitializer />
    </VideoPlayerContext.Provider>
  );
};

export default VideoPlayer;
