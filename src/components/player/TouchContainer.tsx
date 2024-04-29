import React, { ReactNode, useEffect, useRef } from "react";
import { useVideo } from "../../hooks/useVideo";
import { useAds } from "../../hooks/useAds";

const TouchContainer = ({ children }: { children: ReactNode }) => {
  const isShowRef = useRef<boolean>();
  const isSettingOpenRef = useRef<boolean>();
  const isActivateControlsRef = useRef<boolean>();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  const { showToolbar } = useAds();
  const {
    config: { timeForHideEl },
    getIsPlay,
    getVideoWrapperRef,
  } = useVideo({
    onPlayPause: () => {
      hideIfIdle();
    },
    onChangeSetting: (e) => {
      isSettingOpenRef.current = e;
    },
    onActivateControls: (e) => {
      isActivateControlsRef.current = e;
    },
  });

  const setIsShow = (show: boolean) => {
    if (show !== isShowRef.current) {
      isShowRef.current = show;
      const videoWrapperRef = getVideoWrapperRef();
      if (show) {
        videoWrapperRef?.classList.remove("hide-tools");
      } else {
        videoWrapperRef?.classList.add("hide-tools");
      }
    }
  };

  const hideIfIdle = () => {
    if (!showToolbar()) {
      setIsShow(false);
      return;
    }
    setIsShow(true);
    if (!getIsPlay()) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (
        getIsPlay() &&
        !isSettingOpenRef.current &&
        !isActivateControlsRef.current
      ) {
        setIsShow(false);
      }
    }, timeForHideEl);
  };

  useEffect(() => {
    window.addEventListener("keydown", hideIfIdle);
    window.addEventListener("mousedown", hideIfIdle);
    window.addEventListener("touchstart ", hideIfIdle);

    return () => {
      window.removeEventListener("keydown", hideIfIdle);
      window.removeEventListener("mousedown", hideIfIdle);
      window.removeEventListener("touchstart", hideIfIdle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onMouseMove={hideIfIdle}
      onTouchStart={hideIfIdle}
      onMouseDown={hideIfIdle}
      onTouchMove={hideIfIdle}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      {children}
    </div>
  );
};

export default TouchContainer;
