import { useCallback, useRef } from "react";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createCache from "@emotion/cache";
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

const cache = createCache({
  key: "cache so other rtl cache chant override this components",
});

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
        state: playerStateRef.current,
        getVideoWrapperRef: () => videoWrapperRef.current,
      }}
    >
      <GlobalStyles />
      <CacheProvider value={cache}>
        <ThemeProvider theme={config?.style || {}}>
          <VideoWrapperStyle ref={videoWrapperRef}>
            <>
              {children ? (
                <>{children}</>
              ) : (
                <PlayerTemplateSelector config={config} />
              )}
            </>
          </VideoWrapperStyle>
        </ThemeProvider>
      </CacheProvider>
      <PlayerInitializer />
    </VideoPlayerContext.Provider>
  );
};

export default VideoPlayer;
