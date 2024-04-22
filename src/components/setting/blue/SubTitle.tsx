import React, { useCallback, useState } from "react";
import { useSubTitle } from "../../../hooks/useSubTitle";
import SettingModal from "./SettingModal";

const Subtitle = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(-1);

  const { getSubtitles, changeSubtitle } = useSubTitle();

  const setSubtitle = (index: number) => {
    changeSubtitle(index);
    setSelectedIndex(index);
  };

  const loadSubtitles = useCallback(() => {
    const subtitles = getSubtitles();
    const selectedIndex = subtitles.findIndex((x) => x.is_selected);
    if (selectedIndex >= 0) {
      setSelectedIndex(selectedIndex);
    }
  }, [getSubtitles]);

  return (
    <SettingModal
      onLoadedFunction={loadSubtitles}
      currentItem={selectedIndex}
      setItem={setSubtitle}
      title="زیرنویس"
      items={[...getSubtitles()?.map((item) => item.title), -1]}
      iconType="subtitle"
      lastItemLocale="setting_menu_subtitle_off"
    />
  );
};

export default Subtitle;
