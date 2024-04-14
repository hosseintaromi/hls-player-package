import React, { useRef } from "react";
import PlayerTemplate from "../templates/red/PlayerTemplate";
import {
	AdsStateType,
	PlayerInstance,
	PlayerState,
} from "../../@types/player.model";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";
import PlayerInitializer from "../tools/PlayerInitializer";
import MobilePlayerTemplate from "../templates/red/MobilePlayerTemplate";
import BlueTemeplate from "../templates/blue/BlueTemplate";
import CustomPlayer from "../templates/custom/CustomPlayer";

const PlayerTemplateSelector = ({
	config,
}: {
	config: PlayerInstance | undefined;
}) => {
	if (config?.theme === "Blue") {
		return <BlueTemeplate />;
	}

	return window.innerWidth < 768 ? (
		<MobilePlayerTemplate />
	) : (
		<PlayerTemplate />
	);
};

const VideoPlayer = ({
	children,
	config,
	src,
}: {
	children?: React.ReactNode;
	config?: PlayerInstance;
	src?: string;
}) => {
	const playerStateRef = useRef<PlayerState>({} as any);
	const AdsStateRef = useRef<AdsStateType>({
		isPlayingAd: false,
		avoidAds: false,
		currentTime: 0,
	});
	const configRef = useRef<PlayerInstance>(config || ({ src } as any));
	const listenOnLoad = useRef<(() => void)[]>([]);
	const playListeners = useRef<((play: boolean) => void)[]>([]);
	const videoRef = useRef<HTMLVideoElement>();

	const setVideoRef = (ref: HTMLVideoElement) => {
		videoRef.current = ref;
		const state = playerStateRef.current;
		if (state.speeds) {
			state.currentSpeed = state.speeds.find(
				(x) => x.value === ref.playbackRate
			);
		}
	};
	const getVideoRef = () => {
		return videoRef.current;
	};
	const togglePlay = () => {
		playListeners.current.forEach((listener) => listener?.(true));
	};
	const listenPlayPause = (listener: (play: boolean) => void) => {
		playListeners.current.push(listener);
	};

	if (config && src) {
		config.src = src;
	}

	return (
		<VideoPlayerContext.Provider
			value={{
				getVideoRef,
				setVideoRef,
				togglePlay,
				listenPlayPause,
				config: configRef.current,
				listenOnLoad: listenOnLoad.current,
				state: playerStateRef.current,
				adsState: AdsStateRef.current,
			}}
		>
			{children ? (
				<CustomPlayer>{children}</CustomPlayer>
			) : (
				<PlayerTemplateSelector config={config} />
			)}
			<PlayerInitializer />
		</VideoPlayerContext.Provider>
	);
};

export default VideoPlayer;
