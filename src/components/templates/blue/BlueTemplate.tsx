import React, { useEffect, useState } from "react";
import { ThemeProvider, CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import {
	Gradient,
	PlayJumpIconWrapper,
	VideoWrapperBlue,
} from "../../player/VideoPlayerStyle";
import Loading from "../../loading/Loading";
import TouchContainer from "../../player/TouchContainer";
import Video from "../../player/Video";
import Play from "../../tools/Play";
import Jump from "../../tools/Jump";
import BlueToolbar from "../../toolbar/BlueToolbar";
import { useVideo } from "../../../hooks/useVideo";

export const cache = createCache({
	key: "rtl",
	stylisPlugins: [],
});

const BlueTemplate = () => {
	const { style } = useVideo();
	const [isFadeOut, setIsFadeOut] = useState<boolean>(false);

	return (
		<CacheProvider value={cache}>
			<ThemeProvider theme={style}>
				<VideoWrapperBlue id="video_wrapper_id">
					<PlayJumpIconWrapper isFaded={isFadeOut}>
						<Jump type="back" />
						<Play />
						<Jump type="forward" />
					</PlayJumpIconWrapper>
					<Loading />
					<TouchContainer
						canPlayOnClick={false}
						onShow={(show: boolean) => setIsFadeOut(!show)}
					>
						<Video />
					</TouchContainer>
					<Gradient isFaded={isFadeOut} />
					<BlueToolbar isFaded={isFadeOut} />
				</VideoWrapperBlue>
			</ThemeProvider>
		</CacheProvider>
	);
};
export default BlueTemplate;

// var source = {
//     dash: 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
//     hls: 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
//     progressive: 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4',
//     poster: 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/poster.jpg',
//     thumbnailTrack: {
//       url: 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/thumbnails/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.vtt'
//     }
