import { useCallback, useContext } from "react";
import { useContextEvents } from "./useContextEvents";
import { PlayerEventsType } from "../@types";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { findBufferIndex } from "../utils/player-utils";

export const useBuffer = () => {
  const { state, getVideoRef } = useContext(VideoPlayerContext);
  const { call } = useContextEvents<PlayerEventsType>(VideoPlayerContext);

  const getCurrentBuffer = useCallback(
    (el: HTMLVideoElement, forceUpdate?: boolean) => {
      const bufferLength = el.buffered.length;
      if (bufferLength === 0) return { length: 0, index: -1 };
      let currentBuffer = state.currentBuffer;
      const oldBuffer = currentBuffer;
      if (oldBuffer && bufferLength === oldBuffer.length && !forceUpdate) {
        return oldBuffer;
      }
      currentBuffer = findBufferIndex(el);
      return currentBuffer;
    },
    [state.currentBuffer],
  );

  const checkBuffer = useCallback(
    (forceUpdate?: boolean) => {
      const videoEl = getVideoRef?.();
      if (!videoEl) return;
      const buffer = getCurrentBuffer(videoEl, forceUpdate);
      if (!buffer) return;
      const bufferSize =
        buffer.index >= 0
          ? (videoEl.buffered.end(buffer.index) / videoEl.duration) * 100
          : 0;
      call.onUpdateBuffer?.(bufferSize);
    },
    [call, getCurrentBuffer, getVideoRef],
  );

  return { checkBuffer };
};
