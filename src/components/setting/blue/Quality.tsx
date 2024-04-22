import React, { useCallback, useEffect, useState } from "react";
import { useLevel } from "../../../hooks/useLevel";
import { useVideo } from "../../../hooks/useVideo";
import SettingModal from "./SettingModal";

const Quality = () => {
  const [currentLevel, setCurrentLevel] = useState<number>();

  const { getLevels, changeLevel, getCurrentLevel } = useLevel();

  const loadLevels = useCallback(() => {
    const currLevel = getCurrentLevel().isAuto
      ? -1
      : getCurrentLevel().currentLevel;
    setCurrentLevel(currLevel === undefined ? -1 : currLevel);
  }, [getCurrentLevel]);

  useVideo({
    onLoaded: loadLevels,
  });

  const setQuality = (index: number) => {
    changeLevel(index);
    setCurrentLevel(index);
  };

  useEffect(() => {
    loadLevels();
  }, [loadLevels]);

  return (
    <SettingModal
      currentItem={currentLevel}
      setItem={setQuality}
      title="کیفیت پخش"
      items={getLevels()
        ?.map((item) => item.height)
        .concat(-1)}
      iconType="setting"
      lastItemLocale="setting_menu_quality_list_item_auto"
    />
  );
};

export default Quality;
