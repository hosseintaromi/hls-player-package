import { memo, useEffect, useRef, useState } from "react";
import { useVideo } from "../../hooks/useVideo";
import { Bubble } from "./MediaTimeLineStyle";
import Snapshot, { SnapshotModel } from "../tools/Snapshot";
import { formatDuration } from "../../utils/player-utils";
import { useTimeLine } from "../../hooks/useTimeLine";
import CursorIndicator from "./CursorIndicator";
import { useTime } from "../../hooks";
import { fetchThumbnail } from "../../utils/api";

const SnapshotPreview = () => {
  const [hoverValue, setHoverValue] = useState<number | string>();

  const snapshots = useRef<SnapshotModel[]>([]);
  const snapShotBox = useRef<HTMLOutputElement>(null);

  const { getDuration } = useTime();
  const {
    config: { thumbnail },
  } = useVideo();

  let timeOut: ReturnType<typeof setTimeout>;

  const setBubble = (e: any) => {
    const bubbleEl = snapShotBox.current;
    if (!bubbleEl) return;

    const halfBubbleWidth = bubbleEl.offsetWidth / 2;
    const containerWidth = e.target.clientWidth;
    bubbleEl.style.marginLeft = `-${halfBubbleWidth}px `;
    bubbleEl.style.left = `${Math.max(
      halfBubbleWidth,
      Math.min(
        (e.progress * containerWidth) / 100,
        containerWidth - halfBubbleWidth,
      ),
    )}px`;
    const duration = getDuration();
    if (duration) setHoverValue((e.progress * duration) / 100);
  };

  const changeShowBubble = (e: boolean) => {
    const bubbleEl = snapShotBox.current;

    if (!bubbleEl) return;
    if (e) {
      bubbleEl.style.display = "flex";
    } else {
      bubbleEl.style.display = "none";
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
      // const rect = (e.target as any).getBoundingClientRect();
      // (e as any).offsetX =
      //   e.touches[0].clientX - window.pageXOffset - rect.left;
      setBubble(e);
    },
  });

  useEffect(() => {
    fetchThumbnail(thumbnail).then((data) => {
      if (data) snapshots.current = data;
    });
  }, [thumbnail]);

  return (
    <>
      {thumbnail && (
        <>
          <Bubble ref={snapShotBox} className="bubble">
            <Snapshot snapshots={snapshots.current} time={hoverValue} />
            <div style={{ marginTop: "5px" }}>
              {formatDuration(Math.ceil(Number(hoverValue)))}
            </div>
          </Bubble>
          <CursorIndicator />
        </>
      )}
    </>
  );
};

export default memo(SnapshotPreview);
