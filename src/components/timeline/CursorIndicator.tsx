import { useRef } from "react";
import { ThumbCursor } from "./MediaTimeLineStyle";
import { useTimeLine } from "../../hooks/useTimeLine";

const CursorIndicator = () => {
  const snapShotBoxCursor = useRef<HTMLDivElement>(null);

  let timeOut: ReturnType<typeof setTimeout>;

  const setBubble = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const event: any = e.nativeEvent;
    if (!event.target) return;

    const bubbleCursorEl = snapShotBoxCursor.current;
    if (!bubbleCursorEl) return;
    bubbleCursorEl.style.left = `${Math.max(
      -1,
      Math.min(event.offsetX, event.target.clientWidth) + -1,
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
    onTimeLineMouseEnter: () => {
      changeShowBubble(true);
    },
    onTimeLineMouseLeave: () => {
      changeShowBubble(false);
    },
    onTimeLineTouchMove: (e) => {
      changeShowBubble(true);
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        changeShowBubble(false);
      }, 2000);
      const rect = (e.target as any).getBoundingClientRect();
      (e as any).offsetX =
        e.touches[0].clientX - window.pageXOffset - rect.left;
      setBubble(e);
    },
  });

  return <ThumbCursor ref={snapShotBoxCursor} />;
};

export default CursorIndicator;
