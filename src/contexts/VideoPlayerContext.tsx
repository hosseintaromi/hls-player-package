import { createContext } from "react";
import { PlayerContextType } from "../@types/player.model";
import { defaultConfig } from "../config/defaultConfig";

const VideoPlayerContext = createContext<PlayerContextType>({
	config: defaultConfig,
	setVideoRef: (ref) => {},
	getVideoRef: () => undefined,
	listenOnLoad: [],
	state: {} as any,
});

export default VideoPlayerContext;
