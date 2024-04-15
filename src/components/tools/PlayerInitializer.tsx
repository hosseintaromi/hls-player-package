import React, { useContext, useEffect } from "react";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";
import { useLocale } from "../../hooks/useLocale";
import { useSubTitle } from "../../hooks/useSubTitle";
import { useSpeed } from "../../hooks/useSpeed";
import { useVideo } from "../../hooks/useVideo";
import { usePlayerEvents } from "../../hooks";

const PlayerInitializer = () => {
	const context = useContext(VideoPlayerContext);

	const { loadVideo } = usePlayerEvents();
	const { changeLocale } = useLocale({});
	const { initSubtitle } = useSubTitle();
	const { initSpeeds } = useSpeed();

	const initConfig = () => {
		initSpeeds();
		initSubtitle();
	};

	useEffect(() => {
		context.loadVideo = loadVideo;
		context.config.loadVideo = loadVideo;
		if (context.config.src) {
			context.loadVideo(context.config.src);
		}
		context.config.changeLocale = changeLocale;

		initConfig();
		return () => {
			context.hls?.destroy();
		};
	}, []);

	return <></>;
};

export default PlayerInitializer;
