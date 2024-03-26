import { useEffect } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import useContextEvents from "./useContextEvents";
import { PlayerEventsType, PlayerLocaleType } from "../@types/player.model";
import { usePlayerContext } from "./usePlayerContext";

export const useLocale = ({
  onChangeLocale,
}: {
  onChangeLocale?: (locale: PlayerLocaleType) => void;
}) => {
  const { locale } = usePlayerContext();

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
