import { useCallback, useEffect, useRef } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { PlayerEventsType } from "../@types/player.model";
import { useContextEvents } from "./useContextEvents";

export const useSensitiveArea = () => {
  const elementRef = useRef<HTMLElement>();
  const mouseEnterRef = useRef<boolean>();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  const { call } = useContextEvents<PlayerEventsType>(VideoPlayerContext);

  const onMouseEnter = useCallback(
    (enter: boolean) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        if (mouseEnterRef.current !== enter) {
          mouseEnterRef.current = enter;
          call.onActivateControls?.(enter);
        }
      }, 500);
    },
    [call],
  );

  const setSensitive = useCallback(
    (ref: HTMLElement) => {
      elementRef.current = ref;
      ref.onmouseenter = () => onMouseEnter(true);
      ref.onmouseleave = () => onMouseEnter(false);
    },
    [onMouseEnter],
  );

  useEffect(
    () => () => {
      if (elementRef.current) {
        elementRef.current.onmouseenter = null;
        elementRef.current.onmouseleave = null;
      }
    },
    [onMouseEnter],
  );

  return { setSensitive };
};
