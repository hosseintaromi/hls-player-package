import { useEffect } from "react";
import { useVideo } from "./useVideo";

export interface HlsVideoEventType {
	onLoaded?: () => void;
}
export const usePlayerEvents = (events?: HlsVideoEventType) => {
	const { listenOnLoad } = useVideo();

	useEffect(() => {
		if (events?.onLoaded) listenOnLoad.push(events?.onLoaded);
	}, []);

	return {};
};
