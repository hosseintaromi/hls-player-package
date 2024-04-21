import React, { useContext, useEffect } from "react";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";
import { useLocale } from "../../hooks/useLocale";
import { useSubTitle } from "../../hooks/useSubTitle";
import { useSpeed } from "../../hooks/useSpeed";
import { useVideo } from "../../hooks/useVideo";
import { AdsInitializer } from "./AdsInitializer";

const PlayerInitializer = () => {
	const context = useContext(VideoPlayerContext);

	const { loadVideo } = useVideo();
	const { changeLocale } = useLocale({});
	const { initSubtitle } = useSubTitle();
	const { initSpeeds } = useSpeed();

	const initConfig = () => {
		initSpeeds();
		initSubtitle();
	};

	useEffect(() => {
		if (context.config.src) {
			loadVideo(context.config.src);
		}
		context.config.changeLocale = changeLocale;

		initConfig();
		return () => {
			context.hls?.destroy();
		};
	}, []);

	return (
		<>
			<AdsInitializer />
		</>
	);
};

export default PlayerInitializer;
