import React, { useEffect, useState } from "react";
import Icon from "../../icons/Icon";
import Dialog from "../../general/Dialog";
import { DialogTitle } from "../../general/DialogStyle";
import Locale from "../../locale/Locale";
import {
  SettingItemIcon,
  SettingItemSpan,
  SettingMenuItem,
} from "../red/SettingStyle";
import { CenterBox } from "../../general/FlexCenter";
import { useSubTitle } from "../../../hooks/useSubTitle";

const Subtitle = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(-1);

  const [subtitles, setSubtitles] = useState<any[]>();

  const setSubtitle = (index: number) => {
    changeSubtitle(index);
    setSelectedIndex(index);
  };

  const loadSubtitles = () => {
    const subtitles = getSubtitles();
    const selectedIndex = subtitles.findIndex((x) => x.is_selected);
    if (selectedIndex >= 0) {
      setSelectedIndex(selectedIndex);
    }
    setSubtitles(subtitles);
  };

  const { getSubtitles, changeSubtitle } = useSubTitle();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    loadSubtitles();
  }, []);

  return (
    <>
      <Dialog
        onClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
      >
        <DialogTitle>زیرنویس</DialogTitle>
        {subtitles?.map((item, index) => (
          <SettingMenuItem
            onClick={() => {
              setSubtitle(index);
              setIsOpen((pre) => !pre);
            }}
            className={`is-reversed ${selectedIndex === index ? "active" : ""}`}
            key={index + "subDialog"}
          >
            <CenterBox>
              <SettingItemIcon
                className="reversed-icon"
                style={{ display: selectedIndex === index ? "flex" : "none" }}
              >
                <Icon isClickable={true} type="checkMark" />
              </SettingItemIcon>
              <SettingItemSpan className="reserved-span">
                {item.title}
              </SettingItemSpan>
            </CenterBox>
          </SettingMenuItem>
        ))}
        <SettingMenuItem
          onClick={() => {
            setSubtitle(-1);
            setIsOpen((pre) => !pre);
          }}
          className={`is-reversed ${selectedIndex === -1 ? "active" : ""}`}
          key={-1 + "speedDialog"}
        >
          <CenterBox>
            <SettingItemIcon
              className="reversed-icon"
              style={{ display: selectedIndex === -1 ? "flex" : "none" }}
            >
              <Icon isClickable={true} type="checkMark" />
            </SettingItemIcon>
            <SettingItemSpan className="reserved-span">
              <Locale localeKey="setting_menu_subtitle_off" />
            </SettingItemSpan>
          </CenterBox>
        </SettingMenuItem>
      </Dialog>
      <Icon
        onClick={() => setIsOpen((pre) => !pre)}
        isClickable={true}
        type="subtitle"
      />
    </>
  );
};

export default Subtitle;
