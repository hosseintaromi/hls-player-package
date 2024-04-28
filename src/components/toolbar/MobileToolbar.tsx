import React, { useState } from "react";
import {
  IconButton,
  MobileSettingPlay,
  MobileToolbarWrapper,
  MobileTopToolbar,
  SettingItemWrapper,
  SettingLeftSection,
  SettingRightSection,
  TimeCounter,
} from "./ToolbarStyle";
import { ToolBarPlayIcon } from "../player/VideoPlayerStyle";
import Play from "../tools/Play";
import Time from "../tools/Time";
import Fullscreen from "../tools/Fullscreen";
import MediaTimeLine from "../timeline/MediaTimeLine";
import Switch from "../general/Switch";
import Dialog from "../general/Dialog";
import Icon from "../icons/Icon";
import Dropdown from "../general/Dropdown";
import { DialogLabel, DialogTitle } from "../general/DialogStyle";
import SettingItem from "../setting/red/SettingItem";
import Locale from "../locale/Locale";

const MobileToolbar = ({ isFaded }: { isFaded: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const DropdownList = [
    {
      value: "1",
      text: "سلام",
    },
    {
      value: "2",
      text: "یک",
    },
    {
      value: "3",
      text: "دو",
    },
    {
      value: "4",
      text: "سوال",
    },
  ];
  return (
    <MobileToolbarWrapper isFaded={isFaded}>
      <MobileTopToolbar>
        <Dialog
          onClose={() => {
            setIsOpen(false);
          }}
          isOpen={isOpen}
        >
          <DialogTitle>تنظیمات</DialogTitle>
          <SettingItem
            className="dialog-item"
            startIcon={<Icon isClickable type="speed" />}
            text={<Locale localeKey="setting_menu_change_speed_title" />}
          >
            <Switch />
          </SettingItem>
          <DialogLabel>کیفیت</DialogLabel>
          <Dropdown className="dialog-dropdown" options={DropdownList} />
          <DialogLabel>سرعت</DialogLabel>
          <Dropdown className="dialog-dropdown" options={DropdownList} />
        </Dialog>
        <Switch hasIcon />
        <IconButton
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Icon isClickable type="setting" />
        </IconButton>
      </MobileTopToolbar>
      <MobileSettingPlay>
        <ToolBarPlayIcon>
          <Play />
        </ToolBarPlayIcon>
      </MobileSettingPlay>
      <MediaTimeLine />
      <SettingItemWrapper className="setting-item-wrapper">
        <SettingLeftSection>
          <TimeCounter>
            <Time type="Current" />/
          </TimeCounter>
          <Time type="Total" />
        </SettingLeftSection>
        <SettingRightSection>
          <Fullscreen />
        </SettingRightSection>
      </SettingItemWrapper>
    </MobileToolbarWrapper>
  );
};

export default MobileToolbar;
