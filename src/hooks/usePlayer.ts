import { useRef } from "react";
import { PlayerConfigType, PlayerInstance, PlayerLocaleType } from "../@types/player.model";
import { usePlayerContext } from "./usePlayerContext";
import { defaultConfig } from "../config/defaultConfig";

export const usePlayer = (playerConfig: { [key in keyof PlayerConfigType]?: PlayerConfigType[key] }) => {
  const playerDefaults: PlayerInstance = {
    ...defaultConfig,
    ...playerConfig,
  }

  usePlayerContext({
    onUpdateTime: playerConfig.onUpdateTime,
    onEnd: playerConfig.onEnd,
    onLoading: playerConfig.onLoading,
    onPlayPause: playerConfig.onPlayPause,
    onUpdateBuffer: playerConfig.onUpdateBuffer,
    onChangeVolume: playerConfig.onChangeVolume,
  });

  const configRef = useRef<PlayerInstance>(playerDefaults);

  return configRef.current;
};
