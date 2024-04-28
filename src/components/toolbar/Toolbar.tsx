import React from "react";
import {
  SettingItemWrapper,
  SettingLeftSection,
  SettingRightSection,
  TimeCounter,
  TimeDivider,
  ToolbarWrapper,
} from "./ToolbarStyle";
import { ToolBarPlayIcon } from "../player/VideoPlayerStyle";
import Setting from "../setting/red/Setting";
import Play from "../tools/Play";
import Volume from "../tools/Volume";
import Time from "../tools/Time";
import PictureInPicture from "../tools/PictureInPicture";
import Fullscreen from "../tools/Fullscreen";
import MediaTimeLine from "../timeline/MediaTimeLine";

const Toolbar = ({ isFaded }: { isFaded: boolean }) => (
  <ToolbarWrapper isFaded={isFaded}>
    <MediaTimeLine />
    <SettingItemWrapper>
      <SettingLeftSection>
        <ToolBarPlayIcon>
          <Play />
        </ToolBarPlayIcon>
        <Volume />
        <TimeCounter>
          <Time type="Current" />
          <TimeDivider>/</TimeDivider>
          <Time type="Total" />
        </TimeCounter>
      </SettingLeftSection>
      <SettingRightSection>
        <Setting />
        <PictureInPicture />
        <Fullscreen />
      </SettingRightSection>
    </SettingItemWrapper>
  </ToolbarWrapper>
);

export default Toolbar;
