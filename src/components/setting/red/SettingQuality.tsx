import { useState } from "react";
import SettingItem from "./SettingItem";
import { SettingMenu } from "../../general/SettingMenu";
import SettingHeader from "./SettingHeader";
import CheckMark from "../../icons/icon-list/CheckMark";
import Locale from "../../locale/Locale";
import { pageName, pageDir } from "../../../@types/setting.model";
import { useLevel } from "../../../hooks/useLevel";

type SettingQualityType = {
  changePage: (newPageName: pageName, dir: pageDir) => void;
  myRef: React.RefObject<HTMLDivElement>;
};

const SettingQuality = ({ changePage, myRef }: SettingQualityType) => {
  const [currentLevel, setCurrentLevel] = useState<number>();
  const { levels, changeLevel } = useLevel();

  const setQuality = (index: number) => {
    changeLevel(index);
    setCurrentLevel(index);
    changePage(pageName.settingList, pageDir.back);
  };

  const qualityListGenerator = () =>
    levels ? (
      levels.map((item, index) => (
        <SettingItem
          key={`qualityListGenerator${index}`}
          onClick={() => setQuality(index)}
          startIcon={currentLevel === index ? <CheckMark /> : null}
          text={item.level}
        />
      ))
    ) : (
      <></>
    );

  return (
    <SettingMenu myRef={myRef}>
      <SettingHeader
        title={<Locale localeKey="setting_menu_change_quality_title" />}
        hasBackButton
        hasCustomButton={false}
        changePage={changePage}
        backRoute={pageName.settingList}
      />
      <>
        <SettingItem
          onClick={() => setQuality(-1)}
          startIcon={currentLevel === -1 ? <CheckMark /> : null}
          text={<Locale localeKey="setting_menu_quality_list_item_auto" />}
        />
        {qualityListGenerator()}
      </>
    </SettingMenu>
  );
};

export default SettingQuality;
