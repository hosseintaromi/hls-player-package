import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { PlayerEventsType } from "../@types";
import { useVideo } from "./useVideo";
import { useContextEvents } from "./useContextEvents";
import { useUpdate } from "./useUpdate";

export const useVolume = () => {
  const { getVideoRef } = useVideo();
  const { call } = useContextEvents<PlayerEventsType>(VideoPlayerContext);
  const muteState = useUpdate(getVideoRef()?.muted, "mute", VideoPlayerContext);
  const volumeState = useUpdate(
    getVideoRef()?.volume,
    "volume",
    VideoPlayerContext,
  );

  const getVolume = () => {
    const videoRef = getVideoRef();
    if (videoRef) return { volume: videoRef.volume, isMuted: videoRef.muted };
  };

  const changeMute = (e: boolean) => {
    const videoRef = getVideoRef();
    if (videoRef) videoRef.muted = e;
    call.onChangeMute?.(e);
    muteState.update(e);
  };

  const changeVolume = (newVolume: number) => {
    const videoRef = getVideoRef();
    if (videoRef) {
      call.onChangeVolume?.(newVolume);
      if (videoRef.muted) {
        call.onChangeMute?.(false);
        muteState.update(false);
        videoRef.muted = false;
      }
      videoRef.volume = newVolume;
      volumeState.update(newVolume);
    }
  };

  return {
    getVolume,
    changeMute,
    changeVolume,
    isMute: muteState.subject,
    currentVolume: volumeState.subject,
  };
};
