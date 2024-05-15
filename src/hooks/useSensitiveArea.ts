import { MutableRefObject, useEffect, useRef } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { PlayerEventsType } from "../@types/player.model";
import { useContextEvents } from "./useContextEvents";
import { useFn } from "./useFn";

export const useSensitiveArea = (enabled: boolean = true) => {
  const elementRef: MutableRefObject<any> = useRef();
  const mouseEnterRef = useRef<boolean>();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  const { call } = useContextEvents<PlayerEventsType>(VideoPlayerContext);

  const onMouseEnter = useFn((enter: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (mouseEnterRef.current !== enter) {
        mouseEnterRef.current = enter;
        call.onActivateControls?.(enter);
      }
    }, 500);
  });

  useEffect(() => {
    const ref = elementRef.current;
    if (!ref) return;
    ref.onmouseenter = () => {
      onMouseEnter(true);
    };
    ref.onmouseleave = () => {
      if (enabled) onMouseEnter(false);
    };
    return () => {
      ref.onmouseenter = null;
      ref.onmouseleave = null;
    };
  }, [enabled]);

  return elementRef;
};
