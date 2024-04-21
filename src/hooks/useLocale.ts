import { useEffect } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useContextEvents } from "./useContextEvents";
import { PlayerEventsType, PlayerLocaleType } from "../@types/player.model";
import { useVideo } from "./useVideo";

export const useLocale = ({
  onChangeLocale,
}: {
  onChangeLocale?: (locale: PlayerLocaleType) => void;
}) => {
  const {
    config: { locale },
  } = useVideo();
  const { listen, call } =
    useContextEvents<PlayerEventsType>(VideoPlayerContext);

  const changeLocale = (locale: PlayerLocaleType) => {
    call.onChangeLocale?.(locale);
  };

  useEffect(() => {
    listen({ onChangeLocale });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    locale,
    changeLocale,
  };
};
