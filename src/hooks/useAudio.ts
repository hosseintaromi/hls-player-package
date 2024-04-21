import { useContext } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useVideo } from "./useVideo";

export const useAudio = () => {
  const {
    config: { audioTracks },
  } = useVideo();
  const context = useContext(VideoPlayerContext);

  const getAudioTracks = () =>
    context.hls?.audioTracks.filter((item) =>
      audioTracks.length ? audioTracks.includes(item.name) : true,
    );

  const getAudioTrack = () => context.hls?.audioTrack;

  const changeAudioTrack = (index: number) => {
    if (context.hls) context.hls.audioTrack = index;
  };

  return {
    getAudioTracks,
    getAudioTrack,
    changeAudioTrack,
  };
};
