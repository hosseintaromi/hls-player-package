import { useEffect } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import useContextEvents from "./useContextEvents";
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

  const changeLocale = (locale: PlayerLocaleType) => {
    call.onChangeLocale?.(locale);
  };

  const { listen, call } =
    useContextEvents<PlayerEventsType>(VideoPlayerContext);

  useEffect(() => {
    listen({ onChangeLocale });
  }, []);

  return {
    locale,
    changeLocale,
  };
};
