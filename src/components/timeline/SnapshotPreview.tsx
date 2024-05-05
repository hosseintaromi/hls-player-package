import React, { useCallback, useEffect, useRef, useState } from "react";
import { useVideo } from "../../hooks/useVideo";
import { Bubble } from "./MediaTimeLineStyle";
import Snapshot, { SnapshotModel } from "../tools/Snapshot";
import { formatDuration } from "../../utils/player-utils";
import { useTimeLine } from "../../hooks/useTimeLine";
import CursorIndicator from "./CursorIndicator";
import { useTime } from "../../hooks";

const SnapshotPreview = () => {
  const [hoverValue, setHoverValue] = useState<number | string>();
  const [hoverPercent, setHoverPercent] = useState<number>();

  const snapshots = useRef<SnapshotModel[]>([]);
  const snapShotBox = useRef<HTMLOutputElement>(null);

  let timeOut: ReturnType<typeof setTimeout>;

  const { getDuration } = useTime();
  const {
    config: { thumbnail },
  } = useVideo();

  const setBubble = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const event: any = e.nativeEvent;
    const offsetX = event.offsetX;
    if (!event.target) return;

    const bubbleEl = snapShotBox.current;

    if (!bubbleEl) return;
    const halfBubbleWidth = bubbleEl.offsetWidth / 2;
    bubbleEl.style.left = `${Math.max(
      halfBubbleWidth,
      Math.min(offsetX, event.target.clientWidth - halfBubbleWidth),
    )}px`;
    bubbleEl.style.marginLeft = `-${65}px `;

    setHoverPercent((offsetX / event.target.clientWidth) * 100);

    const val = hoverPercent || 0;
    const duration = getDuration();
    if (duration) setHoverValue((val * duration) / 100);
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

  const toSecond = useCallback((time: string) => {
    const timeArr = time.trim().split(":");
    return (
      Number(timeArr[0]) * 3600 + Number(timeArr[1]) * 60 + Number(timeArr[2])
    );
  }, []);

  useEffect(() => {
    if (thumbnail)
      fetch(thumbnail)
        .then((res) => res.text())
        .then((text) => {
          if (thumbnail === "") return;
          let node: SnapshotModel | undefined;
          text.split("\n").forEach((line: string) => {
            if (node) {
              node.img = `${thumbnail.split("/").slice(0, -1).join("/")}/${
                line.split("#xywh=")[0]
              }`;
              const noArr = line.split("#xywh=")[1].split(",");
              node.location = [
                Number(noArr[0]),
                Number(noArr[1]),
                Number(noArr[2]),
                Number(noArr[3]),
              ];
              node = undefined;
            } else if (line.indexOf("-->") > 0) {
              node = {} as any;
              if (node) {
                snapshots.current.push(node);
                const times = line.split("-->");
                node.startTime = toSecond(times[0]);
                node.endTime = toSecond(times[1]);
              }
            }
          });
        })
        .catch((e) => console.error(e));
  }, [thumbnail, toSecond]);

  return (
    <>
      {thumbnail && (
        <>
          <Bubble ref={snapShotBox} className="bubble">
            <Snapshot snapshots={snapshots.current} time={hoverValue} />
            <div style={{ marginTop: "5px" }}>{formatDuration(hoverValue)}</div>
          </Bubble>
          <CursorIndicator />
        </>
      )}
    </>
  );
};

export default SnapshotPreview;
