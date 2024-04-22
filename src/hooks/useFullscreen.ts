import { useEffect, useState } from "react";

export const useFullscreen = (
  changed: (isFullscreen: boolean) => void,
  elRef: HTMLElement | null,
  videoTagRef: HTMLElement | null,
) => {
  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    setUserAgent(userAgent);
  }, []);

  const checkElement = () => {
    if (elRef && videoTagRef) {
      if (userAgent.search("iPhone") < 0) {
        return elRef;
      }
      return videoTagRef;
    }
    return document.getElementsByTagName("body")[0];
  };
  const checkFullscreen = () => {
    // TODO: how to fix this any
    const doc: any = document;
    return (
      doc.webkitIsFullScreen ||
      doc.mozFullScreen ||
      (doc.msFullscreenElement !== null &&
        doc.msFullscreenElement !== undefined)
    );
  };
  const fullscreen = () => {
    // TODO: how to fix this any
    const el: any = checkElement();

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
  const exitFullscreen = () => {
    // TODO: how to fix this any
    const doc: any = document;

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

  const toggleFullscreen = () => {
    if (checkFullscreen()) {
      exitFullscreen();
      changed(false);
    } else {
      fullscreen();
      changed(true);
    }
  };
  const changedFullscreen = () => {
    changed(checkFullscreen());
  };
  const el = checkElement();
  const addEventListener = () => {
    if (!el) return;
    el.addEventListener("fullscreenchange", changedFullscreen);
    el.addEventListener("mozfullscreenchange", changedFullscreen);
    el.addEventListener("MSFullscreenChange", changedFullscreen);
    el.addEventListener("webkitfullscreenchange", changedFullscreen);
  };
  useEffect(() => {
    addEventListener();
    return () => {
      if (!el) return;
      el.removeEventListener("fullscreenchange", changedFullscreen);
      el.removeEventListener("mozfullscreenchange", changedFullscreen);
      el.removeEventListener("MSFullscreenChange", changedFullscreen);
      el.removeEventListener("webkitfullscreenchange", changedFullscreen);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    toggleFullscreen,
    checkFullscreen,
  };
};
