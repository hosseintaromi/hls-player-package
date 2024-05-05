import React, { useState } from "react";
import Icon from "../../icons/Icon";
import Dialog from "../../general/Dialog";
import { DialogTitle } from "../../general/DialogStyle";
import {
  SettingItemIcon,
  SettingItemSpan,
  SettingMenuItem,
} from "../red/SettingStyle";
import { CenterBox } from "../../general/FlexCenter";
import { IconsType, PlayerLocaleType } from "../../../@types";
import Locale from "../../locale/Locale";

type SettingModalType = {
  title: string;
  setItem: (index: number) => void;
  iconType: keyof IconsType;
  lastItemLocale?: keyof PlayerLocaleType;
  currentItem?: number;
  items?: (string | number)[];
};

const SettingModal = ({
  title,
  items,
  setItem,
  currentItem,
  iconType,
  lastItemLocale,
}: SettingModalType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Dialog
        onClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
      >
        <DialogTitle>{title}</DialogTitle>
        {items?.map((item, i) => {
          const index = item !== -1 ? i : -1;
          return (
            <SettingMenuItem
              onClick={() => {
                setItem(index);
                setIsOpen((pre) => !pre);
              }}
              className={`is-reversed ${currentItem === index ? "active" : ""}`}
              key={`${index}MicDialog`}
            >
              <CenterBox>
                <SettingItemIcon
                  className="reversed-icon"
                  style={{
                    display: currentItem === index ? "flex" : "none",
                  }}
                >
                  <Icon isClickable type="checkMark" />
                </SettingItemIcon>
                <SettingItemSpan className="reserved-span">
                  {item === -1 && lastItemLocale ? (
                    <Locale localeKey={lastItemLocale} />
                  ) : (
                    item
                  )}
                </SettingItemSpan>
              </CenterBox>
            </SettingMenuItem>
          );
        })}
      </Dialog>
      <Icon
        onClick={() => setIsOpen((pre) => !pre)}
        isClickable
        type={iconType}
      />
    </>
  );
};

export default SettingModal;
