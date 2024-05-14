import { useRef, useState } from "react";
import { useVideo } from "../../hooks/useVideo";
import { OnUpdateTimeType } from "../../@types/player.model";
import { TimeCounter } from "../toolbar/ToolbarStyle";
import { formatDuration } from "../../utils/player-utils";
import { useTime } from "../../hooks/useTime";

const Time = ({ type }: { type: "Current" | "Total" | "Remain" }) => {
  const [time, setTime] = useState<string>("00:00:00");

  const durationRef = useRef<number>();

  const { getDuration } = useTime();

  const formatTime = (time?: number) => {
    setTime(formatDuration(Math.ceil(time || 0)));
  };

  useVideo({
    onReady: () => {
      if (type === "Total") {
        formatTime(getDuration());
      }
    },
    onUpdateTime: (e: OnUpdateTimeType) => {
      if (type === "Total") {
        if (e.duration !== durationRef.current) {
          formatTime(e.duration);
        }
      }
      switch (type) {
        case "Current":
          formatTime(e.time);
          break;
        case "Remain":
          formatTime(e.duration - e.time);
          break;
      }
    },
  });

  return <TimeCounter className="controlled-tool">{time}</TimeCounter>;
};

export default Time;
