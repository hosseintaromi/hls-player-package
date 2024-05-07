import { useLevel } from "../../../hooks/useLevel";
import SettingModal from "./SettingModal";
import { useSignal } from "../../../hooks/useSignal";

const Quality = () => {
  const { levels, changeLevel, currentLevel } = useLevel();

  const $currentLevel = useSignal(currentLevel);

  const setQuality = (index: number) => {
    changeLevel(index);
  };

  return (
    <SettingModal
      currentItem={$currentLevel}
      setItem={setQuality}
      title="کیفیت پخش"
      items={levels?.map((item) => item.level).concat(-1)}
      iconType="setting"
      lastItemLocale="setting_menu_quality_list_item_auto"
    />
  );
};

export default Quality;
