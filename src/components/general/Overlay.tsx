import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { PlayerEventsType } from "../../@types/player.model";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";
import { useContextEvents } from "../../hooks/useContextEvents";
import { useInit } from "../../hooks/useInit";
import { useFn } from "../../hooks/useFn";

const Wrapper = styled.div({
  position: "relative",
});

const Overlay = ({
  children
}: {
  children: JSX.Element[];
  openSetting: any;
}) => {
  const overlayContentRef = useRef<HTMLDivElement>(null);

  const [overlayVisible, setOverlayVisible] = useState(false);
  
  const { call } = useContextEvents<PlayerEventsType>(VideoPlayerContext);

  const Toggler = children.find(
    (child) => child.props["data-toggler"] === true,
  );

  const Content = children.find(
    (child) => child.props["data-content"] === true,
  );

  const toggleOverlay = (visible: boolean) => {
    setOverlayVisible(visible);
    call.onChangeSetting?.(visible);
  };

  const toggle = () => {
    toggleOverlay(!overlayVisible);
  };

  const clickHandler = useFn((e: any) => {
    if (
      overlayContentRef.current &&
      !overlayContentRef.current.contains(e.target)
    ) {
      toggleOverlay(false);
    }
  });

  useInit(() => {
    document.addEventListener("click", clickHandler, true);
    return () => {
      document.removeEventListener("click", clickHandler, true);
    };
  });

  return (
    <Wrapper className="setting" ref={overlayContentRef}>
      <div onClick={toggle}>{Toggler}</div>
      {overlayVisible && <>{Content}</>}
    </Wrapper>
  );
};

export default Overlay;
