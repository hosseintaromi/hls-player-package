import { ReactNode, useRef } from "react";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";
import { PlayerEventsType } from "../../@types/player.model";
import { useContextEvents } from "../../hooks/useContextEvents";

const SensitiveArea = ({ children }: { children: ReactNode }) => {
  const mouseEnterRef = useRef<boolean>();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  const { call } = useContextEvents<PlayerEventsType>(VideoPlayerContext);

  const onMouseEnter = (enter: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (mouseEnterRef.current !== enter) {
        mouseEnterRef.current = enter;
        call.onActivateControls?.(enter);
      }
    }, 500);
  };

  return (
    <div
      id="sensitive-area"
      onMouseEnter={() => onMouseEnter(true)}
      onMouseLeave={() => onMouseEnter(false)}
    >
      {children}
    </div>
  );
};

export default SensitiveArea;
