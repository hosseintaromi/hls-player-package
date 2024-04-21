import React, { useCallback, useEffect, useState } from "react";
import Icon from "../../icons/Icon";
import { LevelType } from "../../../@types/UseVideoHlsType.model";
import Dialog from "../../general/Dialog";
import { DialogTitle } from "../../general/DialogStyle";
import Locale from "../../locale/Locale";
import {
  SettingItemIcon,
  SettingItemSpan,
  SettingMenuItem,
} from "../red/SettingStyle";
import { CenterBox } from "../../general/FlexCenter";
import { IconButton } from "../../toolbar/ToolbarStyle";
import { useLevel } from "../../../hooks/useLevel";
import { useVideo } from "../../../hooks/useVideo";

const QualityMenuItem = ({
  index,
  clickHandler,
  currentLevel,
  height,
}: {
  index: number;
  clickHandler: (index: number) => void;
  currentLevel?: number;
  height?: number;
}) => (
  <SettingMenuItem
    onClick={() => clickHandler(index)}
    className={`is-reversed ${currentLevel === index ? "active" : ""}`}
    key={`${index}qualityDialog`}
  >
    <CenterBox>
      <SettingItemIcon
        className="reversed-icon"
        style={{
          display: currentLevel === index ? "flex" : "none",
        }}
      >
        <Icon isClickable type="checkMark" />
      </SettingItemIcon>
      <SettingItemSpan className="reserved-span">
        {index !== -1 ? (
          height
        ) : (
          <Locale localeKey="setting_menu_quality_list_item_auto" />
        )}
      </SettingItemSpan>
    </CenterBox>
  </SettingMenuItem>
);

const Quality = () => {
  const [currentLevel, setCurrentLevel] = useState<number>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    setIsOpen((pre) => !pre);
  };

  useEffect(() => {
    loadLevels();
  }, [loadLevels]);

  return (
    <>
      <Dialog
        onClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
      >
        <DialogTitle>کیفیت پخش</DialogTitle>
        {getLevels()?.map((item, index) => (
          <QualityMenuItem
            key={`${index}qualityDialog`}
            clickHandler={setQuality}
            index={index}
            currentLevel={currentLevel}
            height={item.height}
          />
        ))}
        <QualityMenuItem
          key={`${-1}qualityDialog`}
          clickHandler={setQuality}
          index={-1}
          currentLevel={currentLevel}
        />
      </Dialog>
      <IconButton onClick={() => setIsOpen((pre) => !pre)}>
        <Icon isClickable type="setting" />
        {/* <Badge colors='danger' isFixed>
                    12.2
                </Badge> */}
      </IconButton>
    </>
  );
};

export default Quality;
