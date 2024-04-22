import { useCallback, useContext } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useVideo } from "./useVideo";

export const useAudio = () => {
  const {
    config: { audioTracks },
  } = useVideo();
  const context = useContext(VideoPlayerContext);

  const getAudioTracks = useCallback(
    () =>
      context.hls?.audioTracks.filter((item) =>
        audioTracks.length ? audioTracks.includes(item.name) : true,
      ),
    [audioTracks, context.hls?.audioTracks],
  );

  const getAudioTrack = useCallback(
    () => context.hls?.audioTrack,
    [context.hls?.audioTrack],
  );

  const changeAudioTrack = (index: number) => {
    if (context.hls) context.hls.audioTrack = index;
  };

  return {
    getAudioTracks,
    getAudioTrack,
    changeAudioTrack,
  };
};
