import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { PlayerEventsType } from "../@types/player.model";
import { useContextEvents } from "./useContextEvents";

export const useSensitiveArea = (enabled: boolean = true) => {
  const elementRef: MutableRefObject<any> = useRef();
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

  useEffect(() => {
    if (!enabled) return;
    const ref = elementRef.current;
    if (!ref) return;
    ref.onmouseenter = () => onMouseEnter(true);
    ref.onmouseleave = () => onMouseEnter(false);
    return () => {
      ref.onmouseenter = null;
      ref.onmouseleave = null;
    };
  }, [enabled, onMouseEnter]);

  return elementRef;
};
