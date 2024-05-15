import { useContext } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { SubTitle } from "../@types/player.model";
import toWebVTT from "../utils/srt-to-vtt";
import { useVideo } from "./useVideo";
import { useUpdate } from "./useUpdate";

export const useSubTitle = () => {
  const { getVideoRef, state, config } = useVideo();
  const context = useContext(VideoPlayerContext);

  const subtitleState = useUpdate(
    state.subTitles?.findIndex((x) => x.is_selected),
    "subtitle",
    VideoPlayerContext,
  );

  const getSubtitle = () =>
    context.hls?.subtitleTracks.filter((item) =>
      config.subTitle.length ? config.subTitle.includes(item.name) : true,
    );

  const getCurrentSubtitle = () => context.hls?.subtitleTrack;

  const getSubtitles = () => state.subTitles;

  const getTrackById = (trackId: string, tracks: TextTrackList) => {
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      if (track.id === trackId) {
        return track;
      }
    }
  };

  const addTrack = (
    videoEl: HTMLVideoElement,
    subtitle: SubTitle,
    vttUrl: string,
  ) => {
    return new Promise<any>((resolve, reject) => {
      const track = document.createElement("track");
      track.kind = "captions";
      track.label = subtitle.title;
      track.id = subtitle.code;
      track.srclang = subtitle.code;
      track.src = vttUrl;
      track.addEventListener("load", () => {
        resolve(track);
      });
      track.addEventListener("error", () => {
        reject(track);
      });
      videoEl.appendChild(track);
      let nextTrack = getTrackById(subtitle.code, videoEl.textTracks);
      if (nextTrack) {
        nextTrack.mode = "hidden";
      }
    });
  };

  const loadTrack = async (videoEl: HTMLVideoElement, subtitle: SubTitle) => {
    try {
      const res = await fetch(subtitle.url);
      const blob = await res.blob();
      const vttUrl = await toWebVTT(blob);
      const track = await addTrack(videoEl, subtitle, vttUrl);
      return track;
    } catch (exp) {
      console.log(exp);
      return null;
    }
  };

  const changeSubtitle = async (index: number) => {
    const videoEl = getVideoRef();
    if (!videoEl) {
      return;
    }

    const titles = getSubtitles();
    if (!titles || titles.length < 1) {
      return;
    }

    const tracks = videoEl.textTracks;
    const preSubtitle = titles.find((x) => x.is_selected);
    const subEl: HTMLDivElement = videoEl.nextSibling as any;

    let preTrack;
    if (preSubtitle) {
      preSubtitle.is_selected = false;
      preTrack = getTrackById(preSubtitle.code, tracks);
    }

    if (preTrack) {
      preTrack.oncuechange = () => {};
      preTrack.mode = "disabled";
    }

    const nextSubtitle = titles[index];
    if (!nextSubtitle) {
      state.currentSubtitle = undefined;
      subtitleState.update(index);
      if (subEl) {
        subEl.classList.remove("on");
      }
      return;
    }

    let nextTrack = getTrackById(nextSubtitle.code, tracks);
    if (!nextTrack) {
      await loadTrack(videoEl, nextSubtitle);
      nextTrack = getTrackById(nextSubtitle.code, tracks);
    }
    if (nextTrack) {
      nextTrack.mode = "hidden";
      nextTrack.oncuechange = () => {
        const cues: any = nextTrack?.activeCues;
        let cue = cues && cues[0];
        let idx = 0;

        if (cue && subEl) {
          if (idx >= 0) {
            subEl.classList.remove("on");
            subEl.children[0].innerHTML = "";
            subEl.children[0].appendChild(cue.getCueAsHTML());
            subEl.classList.add("on");
          }
          idx = ++idx % 2;
        } else if (subEl) {
          subEl.classList.remove("on");
        }
      };
    }
    state.currentSubtitle = nextSubtitle;
    subtitleState.update(index);
    nextSubtitle.is_selected = true;
  };

  const removeSubtitle = () => {
    changeSubtitle(-1);
    const videoRef = getVideoRef();
    const tracks = videoRef?.querySelectorAll("track[kind=captions]");
    tracks?.forEach((x) => x.remove());
  };

  const initSubtitle = async () => {
    if (!config || !config.subTitle) {
      return;
    }
    state.subTitles = config.subTitle || [];
    const titles = getSubtitles();
    const selectedIndex = titles.findIndex((x) => x.is_selected);
    if (selectedIndex >= 0) {
      changeSubtitle(selectedIndex);
    }
  };

  return {
    getSubtitles,
    changeSubtitle,
    initSubtitle,
    getSubtitle,
    getCurrentSubtitle,
    removeSubtitle,
    currentSubtitle: subtitleState.subject,
  };
};
