import React, { useCallback, useEffect, useState } from "react";
import { MediaPlaylistType } from "../../../@types/UseVideoHlsType.model";
import { useAudio } from "../../../hooks/useAudio";
import { useVideo } from "../../../hooks/useVideo";
import SettingModal from "./SettingModal";

const Mic = () => {
  const [currentAudioTrack, setCurrentAudioTrack] = useState<
    number | undefined
  >();
  const [audioTracks, setAudioTracks] = useState<MediaPlaylistType>();

  const { getAudioTrack, getAudioTracks, changeAudioTrack } = useAudio();

  const loadLevels = useCallback(() => {
    setCurrentAudioTrack(getAudioTrack());
    setAudioTracks(getAudioTracks() || []);
  }, [getAudioTrack, getAudioTracks]);

  useVideo({ onLoaded: loadLevels });

  useEffect(() => {
    loadLevels();
  }, [loadLevels]);

  const setAudioTrack = (index: number) => {
    changeAudioTrack(index);
    setCurrentAudioTrack(index);
  };

  return (
    <SettingModal
      currentItem={currentAudioTrack}
      setItem={setAudioTrack}
      title="زبان پخش"
      items={audioTracks?.map((item) => item.name)}
      iconType="mic"
    />
  );
};

export default Mic;
