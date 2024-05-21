import { useCallback, useContext, useRef } from "react";
import Hls from "hls.js";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { GenericEvents, PlayerEventsType } from "../@types/player.model";
import { useContextEvents } from "./useContextEvents";
import { useBuffer } from "./useBuffer";
import { useUpdate } from "./useUpdate";
import { useInit } from "./useInit";

const isSupportedPlatform = Hls.isSupported();

export const useVideo = (events?: GenericEvents<PlayerEventsType>) => {
  const {
    config,
    setVideoRef: videoRefSetter,
    getVideoRef,
    state,
    ...others
  } = useContext(VideoPlayerContext);
  const context = useContext(VideoPlayerContext);
  const { checkBuffer } = useBuffer();
  const playState = useUpdate(
    state.isPlaying || false,
    "play",
    VideoPlayerContext,
  );

  const timeRef = useRef<number>(0);

  const { listen, call } =
    useContextEvents<PlayerEventsType>(VideoPlayerContext);

  const loadMP4Video = useCallback(
    (src: string, startTime?: number) => {
      const currentStartTime = startTime || config.startTime || 0;

      // Clear the onloadeddata event listener if a hls has played before
      context.hls?.destroy();

      const videoEl = getVideoRef();
      if (!videoEl) return;
      videoEl.src = src;
      videoEl.load();
      videoEl.currentTime = currentStartTime;
    },
    [config.startTime, context.hls, getVideoRef],
  );

  const loadHlsVideo = useCallback((src: string, startTime?: number) => {
    const currentStartTime = startTime || config.startTime || 0;
    const videoEl = getVideoRef();
    if (!videoEl) return;

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

    hls.on(Hls.Events.LEVEL_SWITCHED, () => {
      videoEl.onplaying = () => {
        call.onLoading?.(false);
      };
      // bindVideoElEvents(videoEl);
    });

    hls.on(Hls.Events.ERROR, (event, data) => {
      // eslint-disable-next-line no-console
      if (data) console.log(JSON.stringify(data));
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.MEDIA_ERROR:
            // eslint-disable-next-line no-console
            console.log("MEDIA_ERROR");
            hls.recoverMediaError();
            break;
          case Hls.ErrorTypes.NETWORK_ERROR: {
            // eslint-disable-next-line no-console
            const time = videoEl.currentTime;
            hls.recoverMediaError();
            videoEl.currentTime = time;
            // All retries and media options have been exhausted.
            // Immediately trying to restart loading could cause loop loading.
            // Consider modifying loading policies to best fit your asset and network
            // conditions (manifestLoadPolicy, playlistLoadPolicy, fragLoadPolicy).
            break;
          }
          default:
            // cannot recover
            hls.destroy();
            break;
        }
      }
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

  const setSrc = useCallback(
    (src: string, type?: string, startTime?: number) => {
      call.onChangeSrc?.({ src, type, startTime });
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

  const togglePlayPause = useCallback(() => {
    changePlayPause(!state.isPlaying);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIsPlay = useCallback(() => {
    const videoRef = getVideoRef();
    if (videoRef) {
      return !videoRef.paused;
    }
  }, [getVideoRef]);

  const setMetaData = async () =>
    new Promise((res, rej) => {
      if (context.hls) res(true);
      const state = context.state;
      if (state.metaData) {
        res(state.metaData);
        return;
      }
      const url = config.src;
      if (!url) {
        rej(Error("not found url"));
        return;
      }
      let baseUrl = url.split(".m3u8")[0];
      const lastSlashIndex = baseUrl.lastIndexOf("/");
      baseUrl = baseUrl.substring(0, lastSlashIndex + 1);
      fetch(url)
        .then((r) => r.text())
        .then((text) => {
          state.metaData = {
            lines: (text || "").split("\n"),
            baseUrl,
          };
          res(true);
        });
    });

  const setTime = (el: HTMLVideoElement) => {
    if (Number.isNaN(el.duration)) return;
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

  const bindVideoElEvents = (el: HTMLVideoElement) => {
    if (!el) return;
    videoRefSetter(el);
    el.onwaiting = () => {
      call.onLoading?.(true);
    };
    el.oncanplay = () => {
      call.onLoading?.(false);
    };
    el.onplaying = () => {
      call.onLoading?.(false);
    };
    el.onplay = () => {
      state.isPlaying = true;
      playState.update(true);
      call.onPlayPause?.(true);
    };
    el.onpause = () => {
      state.isPlaying = false;
      playState.update(false);
      call.onLoading?.(false);
      call.onPlayPause?.(false);
    };
    el.onended = () => {
      // call.onEnd?.();
    };
    el.onloadeddata = async () => {
      call.onLoading?.(true); // so it shows loading by default
      await setMetaData();
      setTime(el);
      call.onReady?.(el);
    };
    el.ontimeupdate = () => {
      setTime(el);
    };
  };

  const setVideoRef = useCallback((el?: HTMLVideoElement) => {
    if (!el) return;
    videoRefSetter(el);
    bindVideoElEvents(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInit(() => {
    listen(events);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  config.loadVideo = setSrc;

  return {
    hls: context.hls,
    setVideoRef,
    getVideoRef,
    changePlayPause,
    getIsPlay,
    state,
    loadVideo,
    config,
    setTime,
    isPlay: playState.subject,
    togglePlayPause,
    ...others,
  };
};
