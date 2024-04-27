import React, { useState } from "react";
import { useVideo } from "../../hooks/useVideo";
import { OnUpdateTimeType } from "../../@types/player.model";
import { TimeCounter } from "../toolbar/ToolbarStyle";
import { formatDuration } from "../../utils/player-utils";
import { useTime } from "../../hooks/useTime";

const Time = ({ type }: { type: "Current" | "Total" | "Remain" }) => {
  const [time, setTime] = useState<string>("00:00:00");

  const { getDuration } = useTime();

  useVideo({
    onReady: () => {
      if (type === "Total") setTime(formatDuration(getDuration() || 0));
    },
    onUpdateTime: (e: OnUpdateTimeType) => {
      switch (type) {
        case "Current":
          setTime(formatDuration(e.time));
          break;
        case "Remain":
          setTime(formatDuration(e.duration - e.time));
          break;
      }
    },
  });

  return <TimeCounter>{time}</TimeCounter>;
};

export default Time;
