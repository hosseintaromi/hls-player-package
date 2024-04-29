import React, { useCallback, useEffect, useRef, useState } from "react";
import { useVideo } from "../../hooks/useVideo";
import { OnUpdateTimeType } from "../../@types/player.model";
import { Bubble, ThumbCursor } from "./MediaTimeLineStyle";
import Snapshot, { SnapshotModel } from "../tools/Snapshot";
import { formatDuration } from "../../utils/player-utils";
import { useTimeLine } from "../../hooks/useTimeLine";

const TimeLine = () => {
  const [hoverValue, setHoverValue] = useState<number | string>();
  const [hoverPercent, setHoverPercent] = useState<number>();

  const snapshots = useRef<SnapshotModel[]>([]);
  const snapShotBoxCursor = useRef<HTMLDivElement>(null);
  const snapShotBox = useRef<HTMLOutputElement>(null);
  const duration = useRef(0);

  let timeOut: ReturnType<typeof setTimeout>;

  const {
    config: { thumbnail },
  } = useVideo({
    onReady: (e) => {
      duration.current = e.duration;
    },
    onUpdateTime: (e: OnUpdateTimeType) => {
      duration.current = e.duration;
    },
  });

  const setBubble = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const event: any = e.nativeEvent;
    const offsetX = event.offsetX;
    if (!event.target) return;

    const bubbleEl = snapShotBox.current;
    const bubbleCursorEl = snapShotBoxCursor.current;

    if (!bubbleEl || !bubbleCursorEl) return;
    const halfBubbleWidth = bubbleEl.offsetWidth / 2;
    bubbleEl.style.left = `${Math.max(
      halfBubbleWidth,
      Math.min(offsetX, event.target.clientWidth - halfBubbleWidth),
    )}px`;
    bubbleEl.style.marginLeft = `-${65}px `;
    bubbleCursorEl.style.left = `${Math.max(
      -1,
      Math.min(offsetX, event.target.clientWidth) + -1,
    )}px `;

    setHoverPercent((offsetX / event.target.clientWidth) * 100);

    const val = hoverPercent || 0;

    setHoverValue((val * duration.current) / 100);
  };

  const changeShowBubble = (e: boolean) => {
    const bubbleEl = snapShotBox.current;
    const bubbleCursorEl = snapShotBoxCursor.current;

    if (!bubbleEl || !bubbleCursorEl) return;
    if (e) {
      bubbleEl.style.display = "flex";
      bubbleCursorEl.style.display = "flex";
    } else {
      bubbleCursorEl.style.display = "none";
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
      changeShowBubble(true);
    },
    onTimeLineTouchMove: () => {
      changeShowBubble(true);
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        changeShowBubble(false);
      }, 2000);
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
          <ThumbCursor ref={snapShotBoxCursor} />
        </>
      )}
    </>
  );
};

export default TimeLine;
