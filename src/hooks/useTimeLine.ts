import { useEffect } from "react";
import { GenericEvents } from "../@types";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useContextEvents } from "./useContextEvents";
import { TimeLineEventType } from "../@types/RangeSelectType.model";

export const useTimeLine = (events?: GenericEvents<TimeLineEventType>) => {
  const { listen } = useContextEvents<TimeLineEventType>(VideoPlayerContext);

  useEffect(() => {
    listen(events);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
};
