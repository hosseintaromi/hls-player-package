import { useEffect } from "react";
import { GenericEvents, OnUpdateTimeType } from "../@types";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useContextEvents } from "./useContextEvents";
import { TimeLineEventType } from "../@types/RangeSelectType.model";
import { useVideo } from "./useVideo";

export const useTimeLine = (events?: GenericEvents<TimeLineEventType>) => {
  const { listen, call } =
    useContextEvents<TimeLineEventType>(VideoPlayerContext);

  useVideo({
    onUpdateTime: (e: OnUpdateTimeType) => {
      call.onTimeLineChange?.(e.percentage);
    },
  });

  useEffect(() => {
    listen(events);
  }, [events, listen]);

  return {};
};
