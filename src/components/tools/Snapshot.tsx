import React, { useState, useEffect } from "react";
import { formatDuration } from "../../utils/player-utils";

export interface SnapshotModel {
  img: string;
  startTime: number;
  endTime: number;
  location: [number, number, number, number];
}
interface SnapshotPropsType {
  snapshots: SnapshotModel[];
  time: any;
}
const cashedImages: any = {};

const loadSnapshotImage = (src: string, loaded: () => void) => {
  let cashedImage = cashedImages[src];
  if (!cashedImage) {
    cashedImages[src] = cashedImage = { loaded: false, listeners: [] };
    const image = new Image();
    image.src = src;
    image.onload = () => {
      cashedImage.loaded = true;
      cashedImage.listeners.forEach((listener: () => void) => {
        listener();
      });
      cashedImage.listeners = [];
    };
  }
  if (cashedImage.loaded) {
    loaded();
  } else {
    cashedImage.listeners.push(loaded);
  }
};

const Snapshot = ({ snapshots, time }: SnapshotPropsType) => {
  const [snapshot, setSnapshot] = useState<SnapshotModel>();

  const findSnapshot = (time: number) =>
    snapshots.find((x) => x.startTime < time && x.endTime >= time);

  useEffect(() => {
    const found = findSnapshot(time);
    if (!found) return;
    loadSnapshotImage(found.img, () => {
      setSnapshot(found);
    });
  }, [time]);

  return (
    <>
      {snapshot && (
        <>
          <div
            id="snapshot"
            style={{
              backgroundImage: `url("${snapshot.img}")`,
              width: `${snapshot.location[2]}px`,
              height: `${snapshot.location[3]}px`,
              backgroundPosition: `-${snapshot.location[0]}px -${snapshot.location[1]}px `,
            }}
          />

        </>
      )}
    </>
  );
};

export default Snapshot;
