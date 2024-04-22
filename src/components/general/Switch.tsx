import React, { useState } from "react";
import Icon from "../icons/Icon";
import {
  ButtonCircle,
  ButtonTrack,
  PauseSpanner,
  PlaySpanner,
  Spanner,
  SwitchButton,
  ToggleButton,
} from "./SwitchStyle";

const Switch = ({ hasIcon }: { hasIcon?: boolean }) => {
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [active, setActive] = useState<boolean>(true);

  const togglePlay = () => {
    setAutoPlay(!autoPlay);
  };

  const toggleButton = () => {
    setActive(!active);
  };

  return (
    <>
      {hasIcon ? (
        <SwitchButton onClick={togglePlay}>
          <Spanner>
            <svg
              width="36"
              height="14"
              viewBox="0 0 36 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
            >
              <rect
                x="1"
                width="34"
                height="14"
                rx="7"
                fill="white"
                fillOpacity="0.5"
              />
            </svg>
          </Spanner>
          {autoPlay === true ? (
            <PauseSpanner>
              <Icon isClickable type="autoPlayOn" />
            </PauseSpanner>
          ) : (
            <PlaySpanner>
              <Icon isClickable onClick={togglePlay} type="autoPlayOff" />
            </PlaySpanner>
          )}
        </SwitchButton>
      ) : (
        <ToggleButton onClick={toggleButton}>
          <ButtonTrack />
          <ButtonCircle
            style={
              active
                ? {
                    transform: "translateX(20px)",
                    backgroundColor: "#065fd4",
                  }
                : {}
            }
          />
        </ToggleButton>
      )}
    </>
  );
};
export default Switch;
