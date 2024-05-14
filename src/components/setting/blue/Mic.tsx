import { useAudio } from "../../../hooks/useAudio";
import SettingModal from "./SettingModal";
import { useSignal } from "../../../hooks/useSignal";

const Mic = () => {
  const { getAudioTracks, changeAudioTrack, currentAudioTrack } = useAudio();
  const $currentAudioTrack = useSignal(currentAudioTrack);

  const setAudioTrack = (index: number) => {
    changeAudioTrack(index);
  };

  return (
    <SettingModal
      currentItem={$currentAudioTrack}
      setItem={setAudioTrack}
      title="زبان پخش"
      items={getAudioTracks()?.map((item) => item.name)}
      iconType="mic"
    />
  );
};

export default Mic;
