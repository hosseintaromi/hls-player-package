import React, { ReactNode, useState } from "react";
import { usePlayerContext } from "../../hooks";
import { useAds } from "../../hooks/useAds";
import { formatDuration } from "../../utils/player-utils";
import { OnUpdateTimeType } from "../../@types";
import Locale from "../locale/Locale";
import Icon from "../icons/Icon";
import styled from "@emotion/styled";

type SkipStylePropType = {
  canSkip?: boolean;
};
const SkipStyle = styled.div<SkipStylePropType>((props) => ({
  position: "absolute",
  bottom: 165,
  right: 32,
  background: "#21212199",
  borderRadius: 8,
  padding: "8px 29px",
  color: props.canSkip ? "#FAFAFA99" : "#fff",
  fontSize: 20,
  display: "flex",
  span: {
    marginLeft: 9,
  },
}));

const Skip = ({ children }: { children?: ReactNode }) => {
  const { isPlayingAd, currentAd, skipCurrentAd } = useAds();
  const [remainDuration, setRemainDuration] = useState(0);

  usePlayerContext({
    onUpdateTime: (e: OnUpdateTimeType) => {
      const skipTime = currentAd()?.skipTime;
      if (currentAd()?.canSkip && skipTime !== undefined) {
        const timeToEnableSkip = skipTime - e.time;
        if (timeToEnableSkip > 0) {
          setRemainDuration(timeToEnableSkip);
        } else {
          setRemainDuration(0);
        }
      } else {
        setRemainDuration(e.duration - e.time);
      }
    },
  });

  if (!isPlayingAd()) return null;

  return (
    <SkipStyle canSkip={currentAd()?.canSkip} onClick={skipCurrentAd}>
      {remainDuration !== 0 ? (
        <>
          {formatDuration(remainDuration).slice(3)}
          {currentAd()?.canSkip && (
            <>
              <span>
                <Locale localeKey="can_skip_text" />
              </span>
              <Icon isClickable={true} type="playArrow" />
            </>
          )}
        </>
      ) : (
        <>
          <span>
            <Locale localeKey="skip_text" />
          </span>
          <Icon isClickable={true} type="playArrow" />
        </>
      )}
    </SkipStyle>
  );
};

export default Skip;
