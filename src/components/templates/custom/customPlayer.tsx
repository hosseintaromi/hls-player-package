import React, { useEffect, useState, ReactNode } from "react";
import { ThemeProvider, CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useVideo } from "../../../hooks/useVideo";
import { CustomVideoWrapper } from "../../player/VideoPlayerStyle";

export const cache = createCache({
	key: "rtl",
	stylisPlugins: [],
});

const CustomPlayer = ({ children }: { children: ReactNode }) => {
	const { style } = useVideo();
	const [isFadeOut, setIsFadeOut] = useState<boolean>(false);

	return (
		<CacheProvider value={cache}>
			<ThemeProvider theme={style}>
				<CustomVideoWrapper id="video_wrapper_id">
					{/* <TouchContainer canPlayOnClick={false} onShow={(show: boolean) => setIsFadeOut(!show)} >
                        <Video />
                    </TouchContainer> */}
					{children}
				</CustomVideoWrapper>
			</ThemeProvider>
		</CacheProvider>
	);
};
export default CustomPlayer;
