import { useEffect, useState } from "react";
import SettingItem from "./SettingItem";
import { SettingMenu } from "../../general/SettingMenu";
import SettingHeader from "./SettingHeader";
import CheckMark from "../../icons/icon-list/CheckMark";
import Locale from "../../locale/Locale";
import { SettingItemWrapper } from "./SettingStyle";
import { pageName, pageDir } from "../../../@types/setting.model";
import { useSubTitle } from "../../../hooks/useSubTitle";
import { SubTitle } from "../../../@types/player.model";

type SettingSubtitleType = {
  changePage: (newPageName: pageName, dir: pageDir) => void;
  myRef: React.RefObject<HTMLDivElement>;
};

const SettingSubtitle = ({ changePage, myRef }: SettingSubtitleType) => {
  const [subtitles, setSubtitles] = useState<SubTitle[]>();
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(-1);
  const { getSubtitles, changeSubtitle } = useSubTitle();

  const setSubtitle = (index: number) => {
    changeSubtitle(index);
    setSelectedIndex(index);
    changePage(pageName.settingList, pageDir.back);
  };

  const loadSubtitles = () => {
    const subtitles = getSubtitles();
    setSubtitles(subtitles);
    const selectedIndex = subtitles.findIndex((x) => x.is_selected);
    if (selectedIndex >= 0) {
      setSelectedIndex(selectedIndex);
    }
  };

  useEffect(() => {
    loadSubtitles();
  }, []);

  const subtitleListGenerator = () =>
    subtitles ? (
      subtitles.map((item, index) => (
        <SettingItem
          key={`subtitleListGenerator${index}`}
          onClick={() => setSubtitle(index)}
          startIcon={selectedIndex === index ? <CheckMark /> : null}
          text={item.title}
        />
      ))
    ) : (
      <></>
    );
  return (
    <SettingMenu myRef={myRef}>
      <SettingHeader
        title={<Locale localeKey="setting_menu_change_subtitle" />}
        hasBackButton
        hasCustomButton={false}
        changePage={changePage}
        backRoute={pageName.settingList}
      />
      <SettingItemWrapper>
        <SettingItem
          onClick={() => setSubtitle(-1)}
          startIcon={selectedIndex === -1 ? <CheckMark /> : null}
          text={<Locale localeKey="setting_menu_subtitle_off" />}
        />
        {subtitleListGenerator()}
      </SettingItemWrapper>
    </SettingMenu>
  );
};

export default SettingSubtitle;
