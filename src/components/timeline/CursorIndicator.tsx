import { useRef } from "react";
import { ThumbCursor } from "./MediaTimeLineStyle";
import { useTimeLine } from "../../hooks/useTimeLine";

const CursorIndicator = () => {
  const snapShotBoxCursor = useRef<HTMLDivElement>(null);

  let timeOut: ReturnType<typeof setTimeout>;

  const setBubble = (e: any) => {
    const event: any = e.nativeEvent;
    if (!event.target) return;

    const bubbleCursorEl = snapShotBoxCursor.current;
    if (!bubbleCursorEl) return;
    const containerWidth = e.target.clientWidth;
    bubbleCursorEl.style.left = `${Math.max(
      -1,
      Math.min((e.progress * containerWidth) / 100, containerWidth) + -1,
    )}px `;
  };

  const changeShowBubble = (e: boolean) => {
    const bubbleCursorEl = snapShotBoxCursor.current;
    if (!bubbleCursorEl) return;
    if (e) {
      bubbleCursorEl.style.display = "flex";
    } else {
      bubbleCursorEl.style.display = "none";
    }
  };

  useTimeLine({
    onTimeLineMouseMove: (e) => {
      setBubble(e);
    },
    onTimeLineEnter: () => {
      changeShowBubble(true);
    },
    onTimeLineLeave: () => {
      changeShowBubble(false);
    },
    onTimeLineTouchMove: (e) => {
      changeShowBubble(true);
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        changeShowBubble(false);
      }, 2000);
      setBubble(e);
    },
  });

  return <ThumbCursor ref={snapShotBoxCursor} />;
};

export default CursorIndicator;
