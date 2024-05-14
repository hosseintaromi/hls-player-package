import { useSubTitle } from "../../../hooks/useSubTitle";
import SettingModal from "./SettingModal";
import { useSignal } from "../../../hooks/useSignal";

const Subtitle = () => {
  const { getSubtitles, changeSubtitle, currentSubtitle } = useSubTitle();
  const $currentSubtitle = useSignal(currentSubtitle);

  const setSubtitle = (index: number) => {
    changeSubtitle(index);
  };

  return (
    <SettingModal
      currentItem={$currentSubtitle}
      setItem={setSubtitle}
      title="زیرنویس"
      items={[...getSubtitles()?.map((item) => item.title), -1]}
      iconType="subtitle"
      lastItemLocale="setting_menu_subtitle_off"
    />
  );
};

export default Subtitle;
