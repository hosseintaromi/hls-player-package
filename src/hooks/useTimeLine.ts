import { GenericEvents } from "../@types";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useContextEvents } from "./useContextEvents";
import { TimeLineEventType } from "../@types/RangeSelectType.model";
import { useInit } from "./useInit";

export const useTimeLine = (events?: GenericEvents<TimeLineEventType>) => {
  const { listen } = useContextEvents<TimeLineEventType>(VideoPlayerContext);

  useInit(() => {
    listen(events);
  });

  return {};
};
