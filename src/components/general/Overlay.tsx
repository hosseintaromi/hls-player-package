import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { PlayerEventsType } from "../../@types/player.model";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";
import { useContextEvents } from "../../hooks/useContextEvents";

const Wrapper = styled.div({
  position: "relative",
});

const Overlay = ({
  children,
  openSetting,
}: {
  children: JSX.Element[];
  openSetting: any;
}) => {
  const overlayContentRef = useRef<HTMLDivElement>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const Toggler = children.find(
    (child) => child.props["data-toggler"] === true,
  );
  const Content = children.find(
    (child) => child.props["data-content"] === true,
  );

  const toggle = () => {
    setOverlayVisible(!overlayVisible);
  };
  const clickHandler = (e: any) => {
    if (
      overlayContentRef.current &&
      !overlayContentRef.current.contains(e.target)
    ) {
      setOverlayVisible(false);
    }
  };
  const { call } = useContextEvents<PlayerEventsType>(VideoPlayerContext);

  useEffect(() => {
    // openSetting(pageName.settingList, pageDir.forward)
    call.onChangeSetting?.(overlayVisible);
  }, [call, overlayVisible]);

  useEffect(() => {
    document.addEventListener("click", clickHandler, true);
    return () => {
      document.removeEventListener("click", clickHandler, true);
    };
  }, []);

  return (
    <Wrapper className="setting" ref={overlayContentRef}>
      <div onClick={toggle}>{Toggler}</div>
      {overlayVisible && <>{Content}</>}
    </Wrapper>
  );
};

export default Overlay;
