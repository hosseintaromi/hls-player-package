import React, { useContext, useEffect } from "react";
import { usePlayerEvents } from "../../hooks/usePlayerEvents";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";
import { useLocale } from "../../hooks/useLocale";
import { useSubTitle } from "../../hooks/useSubTitle";

const PlayerInitializer = () => {
  const context = useContext(VideoPlayerContext);

  const { loadVideo } = usePlayerEvents();
  const { changeLocale } = useLocale({});
  const { initSubtitle } = useSubTitle();

  useEffect(() => {
    context.loadVideo = loadVideo;
    context.config.loadVideo = loadVideo;
    if (context.config.src) {
      context.loadVideo(context.config.src);
    }
    context.config.changeLocale = changeLocale;
    
    initSubtitle();
  }, []);

  return <></>;
};

export default PlayerInitializer;
