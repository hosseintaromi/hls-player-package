import React, { useState, useEffect, useCallback } from "react";
import { loadSnapshotImage } from "../../utils/snapshots";

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

const Snapshot = ({ snapshots, time }: SnapshotPropsType) => {
  const [snapshot, setSnapshot] = useState<SnapshotModel>();

  const findSnapshot = useCallback(
    (time: number) =>
      snapshots.find((x) => x.startTime < time && x.endTime >= time),
    [snapshots],
  );

  useEffect(() => {
    const found = findSnapshot(time);
    if (!found) return;
    loadSnapshotImage(found.img, () => {
      setSnapshot(found);
    });
  }, [findSnapshot, time]);

  return (
    <>
      {snapshot && (
        <div
          id="snapshot"
          style={{
            backgroundImage: `url("${snapshot.img}")`,
            width: `${snapshot.location[2]}px`,
            height: `${snapshot.location[3]}px`,
            backgroundPosition: `-${snapshot.location[0]}px -${snapshot.location[1]}px `,
          }}
        />
      )}
    </>
  );
};

export default Snapshot;
