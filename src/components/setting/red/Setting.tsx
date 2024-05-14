import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Overlay from "../../general/Overlay";

import SettingList from "./SettingList";
import SettingPlaybackSpeed from "./SettingPlaybackSpeed";
import SettingQuality from "./SettingQuality";
import SettingSubtitle from "./SettingSubtitle";
import SettingAudioTrack from "./SettingAudioTrack";
import Icon from "../../icons/Icon";
import { FadeBackDrop, OverlayContainer } from "./SettingStyle";

enum pageName {
  settingList = "settingList",
  playbackSpeed = "playbackSpeed",
  quality = "quality",
  subtitle = "subtitle",
  audioTrack = "audioTrack",
}
enum pageDir {
  back = "back",
  forward = "forward",
}

const Setting = () => {
  const settingListRef = useRef<HTMLDivElement>(null);
  const settingPlaybackRef = useRef<HTMLDivElement>(null);
  const settingQualityRef = useRef<HTMLDivElement>(null);
  const settingSubtitleRef = useRef<HTMLDivElement>(null);
  const settingAudioTrackRef = useRef<HTMLDivElement>(null);
  const lastSettingRef = useRef<HTMLDivElement | null>();
  const [currentPage, setCurrentPage] = useState<HTMLDivElement | null>(null);

  const pageObj = {
    [pageName.settingList]: settingListRef,
    [pageName.playbackSpeed]: settingPlaybackRef,
    [pageName.quality]: settingQualityRef,
    [pageName.subtitle]: settingSubtitleRef,
    [pageName.audioTrack]: settingAudioTrackRef,
  };

  const changePage = (newPageName: pageName, dir: pageDir) => {
    const firstEl = lastSettingRef.current;
    const secondEl = pageObj[newPageName].current;
    if (!secondEl) return;
    secondEl!.style.display = "block";
    if (firstEl) {
      firstEl!.style.position = "absolute";
      firstEl!.style.opacity = "1";
      firstEl!.style.transform = `translateX(${dir === pageDir.back ? 0 : 0}%)`;
      secondEl!.style.opacity = "0";
      secondEl!.style.position = "absolute";
      secondEl!.style.transform = `translateX(${dir === pageDir.back ? 100 : -100}%)`;
      secondEl!.parentElement!.style.height = `${firstEl?.clientHeight}px`;
    } else {
      secondEl!.style.opacity = "1";
      secondEl!.style.transform = `translateX(0%)`;
    }
    if (firstEl) {
      firstEl!.style.opacity = "0";
      firstEl!.style.transform = `translateX(${dir === pageDir.back ? -100 : 100}%)`;
      firstEl!.style.zIndex = `1`;
    }
    if (newPageName === pageName.settingList) {
      secondEl!.style.width = "300px";
      secondEl!.parentElement!.style.width = "300px";
    } else {
      secondEl!.parentElement!.style.width = "200px";
      secondEl!.style.width = "200px";
    }
    secondEl!.style.zIndex = "10";
    secondEl!.style.opacity = "1";
    secondEl!.style.transform = `translateX(${dir === pageDir.back ? 0 : 0}%)`;
    secondEl!.parentElement!.style.height = `${secondEl?.clientHeight}px`;
    lastSettingRef.current = secondEl;
    setCurrentPage(lastSettingRef.current);
  };

  return (
    <>
      <Overlay openSetting={changePage}>
        <Icon type="setting" isClickable data-toggler />
        {/* <FadeBackDrop > */}
        <OverlayContainer data-content id="setting-menu">
          {createPortal(<FadeBackDrop />, document.body)}
          <SettingList
            myRef={settingListRef}
            changePage={changePage}
            currentPage={currentPage}
          />
          <SettingPlaybackSpeed
            myRef={settingPlaybackRef}
            changePage={changePage}
          />
          <SettingQuality myRef={settingQualityRef} changePage={changePage} />

          <SettingSubtitle myRef={settingSubtitleRef} changePage={changePage} />

          <SettingAudioTrack
            myRef={settingAudioTrackRef}
            changePage={changePage}
          />
        </OverlayContainer>
        {/* </FadeBackDrop> */}
      </Overlay>
    </>
  );
};

export default Setting;
