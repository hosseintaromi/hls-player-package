import React, { useEffect, useState, ReactNode } from "react";
import { ThemeProvider, CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useVideo } from "../../../hooks/useVideo";
import { VideoWrapperStyle } from "../../player/VideoPlayerStyle";

export const cache = createCache({
  key: "rtl",
  stylisPlugins: [],
});

const CustomPlayer = ({ children }: { children: ReactNode }) => {
  const {
    config: { style },
  } = useVideo();
  const [isFadeOut, setIsFadeOut] = useState<boolean>(false);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={style}>
        <VideoWrapperStyle id="video_wrapper_id">
          {/* <TouchContainer canPlayOnClick={false} onShow={(show: boolean) => setIsFadeOut(!show)} >
                        <Video />
                    </TouchContainer> */}
          {children}
        </VideoWrapperStyle>
      </ThemeProvider>
    </CacheProvider>
  );
};
export default CustomPlayer;
