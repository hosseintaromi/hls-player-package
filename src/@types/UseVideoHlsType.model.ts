import { HlsConfig, Level, MediaPlaylist } from "hls.js";

export type LevelType = Level[];

export type changeHlsLevelType = (level: number) => void;

export type changeHlsSubtitleType = (level: number) => void;

export type MediaPlaylistType = MediaPlaylist[];

export type audioTrackObjType = {
  changeHlsAudioTrack: changeHlsSubtitleType;
};

export type subtitleObjType = {
  changeHlsSubtitle: changeHlsSubtitleType;
};

export type qualityObjType = {
  changeHlsLevel: changeHlsLevelType;
};

export type UseVideoHlsType = {
  src: string;
  config?: HlsConfig;
  options?: {
    disabled: boolean;
  };
  getHlsSubtitle?: (
    subsArr: MediaPlaylistType,
    currentSubtitle: number,
  ) => void;
  getHlsAudioTrack?: (
    audioArr: MediaPlaylistType,
    currentAudio: number,
  ) => void;
  getHlsLevels?: (levels: LevelType) => void;
  getCurrentLevel?: (currentLevel: number) => void;
};
