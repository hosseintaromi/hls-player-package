import { useCallback, useEffect } from "react";
import { useUpdate } from "./useUpdate";
import VideoPlayerContext from "../contexts/VideoPlayerContext";

interface DocumentWithFullscreen extends Document {
  webkitIsFullScreen?: boolean;
  mozFullScreen?: boolean;
  msFullscreenElement?: Element | null;
}

interface ElementWithFullscreen extends HTMLElement {
  webkitEnterFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
  msRequestFullscreen?: () => void;
}

interface DocumentWithExitFullscreen extends Document {
  mozCancelFullScreen?: () => void;
  webkitExitFullscreen?: () => void;
  msExitFullscreen?: () => void;
}

export const useFullScreen = (
  elRef: HTMLElement | null,
  videoTagRef: HTMLElement | null,
) => {
  const checkFullScreen = () => {
    const doc: DocumentWithFullscreen = document;

    return (
      doc.webkitIsFullScreen ||
      doc.mozFullScreen ||
      (doc.msFullscreenElement !== null &&
        doc.msFullscreenElement !== undefined)
    );
  };

  const isFullScreenState = useUpdate(
    checkFullScreen(),
    "FullScreen",
    VideoPlayerContext,
  );

  const checkElement = useCallback(() => {
    if (elRef && videoTagRef) {
      if (window.navigator.userAgent.search("iPhone") < 0) {
        return elRef;
      }
      return videoTagRef;
    }
    return document.getElementsByTagName("body")[0];
  }, [elRef, videoTagRef]);

  const FullScreen = () => {
    const el: ElementWithFullscreen = checkElement();

    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitEnterFullScreen) {
      el.webkitEnterFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    const doc: DocumentWithExitFullscreen = document;

    if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    } else if (doc.exitFullscreen) {
      doc.exitFullscreen();
    }
  };

  const toggleFullScreen = () => {
    if (checkFullScreen()) {
      exitFullScreen();
      isFullScreenState.update(false);
    } else {
      FullScreen();
      isFullScreenState.update(true);
    }
  };

  const changedFullScreen = useCallback(() => {
    isFullScreenState.update(checkFullScreen());
  }, [isFullScreenState]);

  const addEventListener = useCallback(() => {
    const el = checkElement();
    if (!el) return;
    el.addEventListener("fullscreenchange", changedFullScreen);
    el.addEventListener("mozfullscreenchange", changedFullScreen);
    el.addEventListener("MSFullscreenChange", changedFullScreen);
    el.addEventListener("webkitfullscreenchange", changedFullScreen);
  }, [changedFullScreen, checkElement]);

  useEffect(() => {
    const el = checkElement();
    addEventListener();
    return () => {
      if (!el) return;
      el.removeEventListener("fullscreenchange", changedFullScreen);
      el.removeEventListener("mozfullscreenchange", changedFullScreen);
      el.removeEventListener("MSFullscreenChange", changedFullScreen);
      el.removeEventListener("webkitfullscreenchange", changedFullScreen);
    };
  }, [addEventListener, changedFullScreen, checkElement]);

  return {
    toggleFullScreen,
    checkFullscreen: checkFullScreen,
    isFullscreen: isFullScreenState.subject,
  };
};
