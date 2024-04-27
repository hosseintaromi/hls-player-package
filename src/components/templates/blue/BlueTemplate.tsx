import React, { useState } from "react";
import { Gradient, PlayJumpIconWrapper } from "../../player/VideoPlayerStyle";
import Loading from "../../general/Loading";
import TouchContainer from "../../player/TouchContainer";
import Video from "../../player/Video";
import Play from "../../tools/Play";
import Jump from "../../tools/Jump";
import BlueToolbar from "../../toolbar/BlueToolbar";

const BlueTemplate = () => {
  const [isFadeOut, setIsFadeOut] = useState<boolean>(false);

  return (
    <>
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
    </>
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
