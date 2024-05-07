import { useState } from "react";
import {
  SettingItemWrapper,
  SettingLeftSection,
  SettingRightSection,
  TimeCounter,
  ToolbarWrapper,
} from "./ToolbarStyle";
import { ToolBarPlayIcon } from "../player/VideoPlayerStyle";
import Play from "../tools/Play";
import Time from "../tools/Time";
import PictureInPicture from "../tools/PictureInPicture";
import Fullscreen from "../tools/Fullscreen";
import MediaTimeLine from "../timeline/MediaTimeLine";
import Speed from "../setting/blue/Speed";
import Subtitle from "../setting/blue/SubTitle";
import Mic from "../setting/blue/Mic";
import Quality from "../setting/blue/Quality";
import SensitiveArea from "../player/SensitiveArea";
import Skip from "../tools/SkipAd";
import { useLevel } from "../../hooks/useLevel";
import { useSubTitle } from "../../hooks";
import { useAudio } from "../../hooks/useAudio";
import { useVideo } from "../../hooks/useVideo";
import Volume from "../tools/Volume";

const BlueToolbar = () => {
  const [isShowQ, setIsShowQ] = useState<any>();
  const [isShowS, setIsShowS] = useState<any>();
  const [isShowA, setIsShowA] = useState<any>();
  const { levels } = useLevel();
  const { getSubtitle } = useSubTitle();
  const { getAudioTracks } = useAudio();

  const loadLevels = () => {
    setIsShowQ(levels !== undefined);
    setIsShowS(getSubtitle() !== undefined);
    setIsShowA(getAudioTracks() !== undefined);
  };
  useVideo({
    onLoaded: loadLevels,
  });

  return (
    <SensitiveArea>
      <Skip />
      <ToolbarWrapper>
        <TimeCounter className="blue-counter controlled-tool">
          <Time type="Current" />
          <Time type="Total" />
        </TimeCounter>
        <MediaTimeLine />
        <SettingItemWrapper className="blue-setting-wrapper">
          <SettingLeftSection>
            <ToolBarPlayIcon>
              <Play />
            </ToolBarPlayIcon>
            <Volume />
          </SettingLeftSection>
          <SettingRightSection>
            {isShowA && <Mic />}
            {isShowS && <Subtitle />}
            <Speed />
            {isShowQ && <Quality />}

            <PictureInPicture />
            <Fullscreen />
          </SettingRightSection>
        </SettingItemWrapper>
      </ToolbarWrapper>
    </SensitiveArea>
  );
};

export default BlueToolbar;
