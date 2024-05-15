import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useContextEvents } from "./useContextEvents";
import { PlayerEventsType, PlayerLocaleType } from "../@types/player.model";
import { useVideo } from "./useVideo";
import { useInit } from "./useInit";

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

  useInit(() => {
    listen({ onChangeLocale });
  });

  return {
    locale,
    changeLocale,
  };
};
