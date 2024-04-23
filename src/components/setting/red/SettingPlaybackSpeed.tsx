import React, { useState } from "react";
import SettingItem from "./SettingItem";
import { SettingMenu } from "../../general/SettingMenu";
import SettingHeader from "./SettingHeader";
import { useVideo } from "../../../hooks/useVideo";
import Locale from "../../locale/Locale";
import Icon from "../../icons/Icon";
import { pageName, pageDir } from "../../../@types/setting.model";
import { useSpeed } from "../../../hooks/useSpeed";
import { useSignal } from "../../../hooks/useSignal";

type settingPlaybackSpeedPropsType = {
  changePage: (newPageName: pageName, dir: pageDir) => void;
  myRef: React.RefObject<HTMLDivElement>;
};

const SettingPlaybackSpeed = ({
  changePage,
  myRef,
}: settingPlaybackSpeedPropsType) => {
  const { getSpeeds, changeSpeed, currentSpeed } = useSpeed();
  const $currentSpeed = useSignal(currentSpeed);

  const setSpeed = (index: number) => {
    changeSpeed(index);
    changePage(pageName.settingList, pageDir.back);
  };

  return (
    <>
      <SettingMenu myRef={myRef}>
        <>
          <SettingHeader
            title={<Locale localeKey="setting_menu_change_speed_title" />}
            hasBackButton
            hasCustomButton={false}
            changePage={changePage}
            backRoute={pageName.settingList}
          />
          {getSpeeds()?.map((speedItem, index) => (
            <SettingItem
              key={`speedItemdd${index}`}
              onClick={() => setSpeed(index)}
              startIcon={
                speedItem.value === getSpeeds()?.[$currentSpeed].value ? (
                  <Icon isClickable type="checkMark" />
                ) : (
                  <></>
                )
              }
              text={speedItem.key}
            />
          ))}
        </>
      </SettingMenu>
    </>
  );
};

export default SettingPlaybackSpeed;
