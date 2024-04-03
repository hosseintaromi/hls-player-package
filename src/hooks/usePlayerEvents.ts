import { useCallback, useContext, useEffect } from "react";
import Hls from "hls.js";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { usePlayerContext } from "./usePlayerContext";

const isSupportedPlatform = Hls.isSupported();

export interface HlsVideoEventType {
  onLoaded?: () => void;
}
export const usePlayerEvents = (events?: HlsVideoEventType) => {
  const {
    type,
    getVideoRef,
    listenOnLoad,
    hls,
    qualities,
    subTitle,
    audioTracks,
  } = usePlayerContext();
  const context = useContext(VideoPlayerContext);

  const loadVideo = useCallback((src: string) => {
    if (type === "HLS" && isSupportedPlatform) {
      loadHlsVideo(src);
    } else {
      loadMP4Video(src);
    }
  }, []);

  const loadMP4Video = useCallback((src: string) => {
    const videoEl = getVideoRef();
    if (!videoEl) return;
    videoEl.src = src;
    videoEl.load();
    videoEl.onloadeddata = () => {
      listenOnLoad.forEach((listener) => {
        listener();
      });
    };
  }, []);

  const loadHlsVideo = useCallback((src: string) => {
    const videoEl = getVideoRef();
    if (!videoEl) return;

    const hls = (context.hls = new Hls({
      enableWorker: false,
    }));
    hls.attachMedia(videoEl);

    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      if (isSupportedPlatform) {
        hls.loadSource(src);
      } else {
        videoEl.src = src;
      }
    });
    hls.on(Hls.Events.ERROR, function (event, data) {
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
  }, []);

  const getLevels = () => {
    return context.hls?.levels.filter((item) =>
      qualities.length ? qualities.includes(item.height) : true
    );
  };
  const getCurrentLevel = () => {
    return {
      currentLevel: context.hls?.currentLevel,
      isAuto: context.hls?.autoLevelEnabled,
      defaultQuality: context?.config?.defaultQuality || null,
    };
  };
  const changeLevel = (index: number) => {
    if (context.hls) context.hls.currentLevel = index;
  };

  const getSubtitle = () => {
    return context.hls?.subtitleTracks.filter((item) =>
      subTitle.length ? subTitle.includes(item.name) : true
    );
  };
  const getCurrentSubtitle = () => {
    return context.hls?.subtitleTrack;
  };
  const changeSubtitle = (index: number) => {
    if (context.hls) context.hls.subtitleTrack = index;
  };

  const getAudioTracks = () => {
    return context.hls?.audioTracks.filter((item) =>
      audioTracks.length ? audioTracks.includes(item.name) : true
    );
  };
  const getAudioTrack = () => {
    return context.hls?.audioTrack;
  };
  const changeAudioTrack = (index: number) => {
    if (context.hls) context.hls.audioTrack = index;
  };

  useEffect(() => {
    if (events?.onLoaded) listenOnLoad.push(events?.onLoaded);
  }, []);

  return {
    loadVideo,
    getLevels,
    getCurrentLevel,
    changeLevel,
    getSubtitle,
    getCurrentSubtitle,
    getAudioTracks,
    getAudioTrack,
    changeAudioTrack,
  };
};
