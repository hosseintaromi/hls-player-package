import { SnapshotModel } from "../components/tools/Snapshot";
import { toSecond } from "./player-utils";

export const fetchThumbnail = async (thumbnail?: string) => {
  if (thumbnail) {
    try {
      const res = await fetch(thumbnail);
      const text = await res.text();
      if (thumbnail === "") return;
      let node: SnapshotModel | undefined;
      const snapshots: SnapshotModel[] = [];
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
            snapshots.push(node);
            const times = line.split("-->");
            node.startTime = toSecond(times[0]);
            node.endTime = toSecond(times[1]);
          }
        }
      });
      return snapshots;
    } catch (error) {
      console.error(error);
    }
  }
};
