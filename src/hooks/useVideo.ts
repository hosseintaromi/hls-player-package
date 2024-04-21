import { useCallback, useContext, useEffect, useRef } from "react";
import Hls from "hls.js";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { GenericEvents, PlayerEventsType } from "../@types/player.model";
import { useContextEvents } from "./useContextEvents";
import { useBuffer } from "./useBuffer";

const isSupportedPlatform = Hls.isSupported();

export const useVideo = (events?: GenericEvents<PlayerEventsType>) => {
  const {
    config,
    setVideoRef: videoRefSetter,
    getVideoRef,
    listenOnLoad,
    state,
  } = useContext(VideoPlayerContext);
  const context = useContext(VideoPlayerContext);
  const { checkBuffer } = useBuffer();

  const timeRef = useRef<number>(0);

  const { listen, call } =
    useContextEvents<PlayerEventsType>(VideoPlayerContext);

  const loadMP4Video = useCallback((src: string, startTime?: number) => {
    const currentStartTime = startTime || config.startTime || 0;

    // Clear the onloadeddata event listener if a hls has played before
    context.hls?.destroy();

    const videoEl = getVideoRef();
    if (!videoEl) return;
    videoEl.src = src;
    videoEl.load();
    videoEl.onloadeddata = () => {
      videoEl.currentTime = currentStartTime;
      listenOnLoad.forEach((listener) => {
        listener();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadHlsVideo = useCallback((src: string, startTime?: number) => {
    const currentStartTime = startTime || config.startTime || 0;
    const videoEl = getVideoRef();
    if (!videoEl) return;

    // Clear the onloadeddata event listener if a mp4 has played before
    videoEl.onloadeddata = null;

    const hls = (context.hls = new Hls({
      enableWorker: false,
      startPosition: currentStartTime,
    }));
    hls.attachMedia(videoEl);

    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      if (isSupportedPlatform) {
        hls.loadSource(src);
      } else {
        videoEl.src = src;
      }
    });
    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data) console.log(JSON.stringify(data));
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log("MEDIA_ERROR");
            hls.recoverMediaError();
            break;
          case Hls.ErrorTypes.NETWORK_ERROR:
            console.error("fatal network error encountered", data);
            // All retries and media options have been exhausted.
            // Immediately trying to restart loading could cause loop loading.
            // Consider modifying loading policies to best fit your asset and network
            // conditions (manifestLoadPolicy, playlistLoadPolicy, fragLoadPolicy).
            break;
          default:
            // cannot recover
            hls.destroy();
            break;
        }
      }
    });
    hls.on(Hls.Events.LEVEL_LOADED, () => {
      listenOnLoad.forEach((listener) => {
        listener();
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadVideo = useCallback(
    (src: string, type?: string, startTime?: number) => {
      const currentType = type || config.type;
      if (currentType === "HLS" && isSupportedPlatform) {
        loadHlsVideo(src, startTime);
      } else {
        loadMP4Video(src, startTime);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const changePlayPause = (play: boolean) => {
    const videoRef = getVideoRef();
    if (videoRef) {
      if (play) {
        videoRef.play();
      } else {
        videoRef.pause();
      }
    }
  };

  const getIsPlay = () => {
    const videoRef = getVideoRef();
    if (videoRef) {
      return !videoRef.paused;
    }
  };

  const setVideoRef = (el?: HTMLVideoElement) => {
    if (!el) return;
    videoRefSetter(el);
    el.onwaiting = () => {
      call.onLoading?.(true);
    };
    el.oncanplay = () => {
      call.onLoading?.(false);
    };
    el.onplay = () => {
      call.onPlayPause?.(true);
    };
    el.onpause = () => {
      call.onPlayPause?.(false);
    };
    el.onended = () => {
      call.onEnd?.();
    };
    el.onloadeddata = () => {
      call.onReady?.(el);
    };
    el.ontimeupdate = () => {
      const currentTime = el.currentTime;
      if (currentTime !== timeRef.current) {
        timeRef.current = currentTime;
        const percentage = (currentTime / el.duration) * 100;
        checkBuffer();
        call.onUpdateTime?.({
          time: timeRef.current,
          duration: el.duration,
          percentage,
        });
      }
    };
  };

  useEffect(() => {
    listen(events);
    if (events?.onLoaded) {
      listenOnLoad.push(events?.onLoaded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  config.loadVideo = loadVideo;

  return {
    hls: context.hls,
    setVideoRef,
    getVideoRef,
    changePlayPause,
    getIsPlay,
    listenOnLoad,
    state,
    loadVideo,
    config,
  };
};
