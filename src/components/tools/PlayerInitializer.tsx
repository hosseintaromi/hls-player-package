import React, { useContext, useEffect } from "react";
import { usePlayerEvents } from "../../hooks/usePlayerEvents";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";
import { useLocale } from "../../hooks/useLocale";
import { useSubTitle } from "../../hooks/useSubTitle";
import { useSpeed } from "../../hooks/useSpeed";

const PlayerInitializer = () => {
	const context = useContext(VideoPlayerContext);

	const { loadVideo } = usePlayerEvents();
	const { changeLocale } = useLocale({});
	const { initSubtitle } = useSubTitle();
	const { initSpeeds } = useSpeed();

	useEffect(() => {
		context.loadVideo = loadVideo;
		context.config.loadVideo = loadVideo;
		if (context.config.src) {
			context.loadVideo(context.config.src);
		}
		context.config.changeLocale = changeLocale;

		initSpeeds();
		initSubtitle();
		return () => {
			context.hls?.destroy();
		};
	}, []);

	return <></>;
};

export default PlayerInitializer;
