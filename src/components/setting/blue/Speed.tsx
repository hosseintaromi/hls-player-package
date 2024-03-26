import React, { HTMLAttributes, useState } from "react";
import Icon from "../../icons/Icon";
import { usePlayerContext } from "../../../hooks/usePlayerContext";
import Dialog from "../../general/Dialog";
import { DialogTitle } from "../../general/DialogStyle";
import {
  SettingItemIcon,
  SettingItemSpan,
  SettingMenuItem,
} from "../red/SettingStyle";
import { CenterBox } from "../../general/FlexCenter";

const Speed = ({ onClick }: HTMLAttributes<HTMLElement>) => {
  const { getSpeeds, changeSpeed, speed } = usePlayerContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setSpeed = (index: number) => {
    changeSpeed(index);
  };

  return (
    <>
      <Dialog
        onClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
      >
        <DialogTitle>سرعت پخش</DialogTitle>
        {getSpeeds()?.map((speedItem, index) => (
          <SettingMenuItem
            onClick={() => {
              setSpeed(index);
              setIsOpen((pre) => !pre);
            }}
            className={`is-reversed ${
              speedItem.value === speed?.value ? "active" : ""
            }`}
            key={index + "speedDialog"}
          >
            <CenterBox>
              <SettingItemIcon
                className="reversed-icon"
                style={{
                  display: speedItem.value === speed?.value ? "flex" : "none",
                }}
              >
                <Icon isClickable={true} type="checkMark" />
              </SettingItemIcon>
              <SettingItemSpan className="reserved-span">
                {speedItem.key}
              </SettingItemSpan>
            </CenterBox>
          </SettingMenuItem>
        ))}
      </Dialog>
      <Icon
        title={speed?.key + ""}
        onClick={() => setIsOpen((pre) => !pre)}
        isClickable={true}
        type="speed"
      />
    </>
  );
};

export default Speed;
