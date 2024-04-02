import { useContext, useRef } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { SubTitle } from "../@types/player.model";
import toWebVTT from "../utils/srt-to-vtt";

export const useSubTitle = () => {
  const { getVideoRef, state } = useContext(VideoPlayerContext);

  const getSubtitles = () => {
    return state.subTitles;
  };

  const getTrackById = (trackId: string, tracks: TextTrackList) => {
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      if (track.id === trackId) {
        return track;
      }
    }
  };

  const loadTrack = async (subtitle: SubTitle) => {
    try {
      const res = await fetch(subtitle.url);
      const blob = await res.blob();
      const vttUrl = await toWebVTT(blob);
      const track = document.createElement("track");
      track.kind = "captions";
      track.label = subtitle.title;
      track.id = subtitle.code;
      track.srclang = subtitle.code;
      track.src = vttUrl;
      return track;
    } catch {
      return null;
    }
  };

  const changeSubtitle = async (index: number) => {
    const videoRef = getVideoRef();
    if (!videoRef) {
      return;
    }

    const titles = getSubtitles();
    if (!titles || titles.length < 1) {
      return;
    }

    const tracks = videoRef.textTracks;
    const preSubtitle = titles.find((x) => x.is_selected);

    let preTrack;
    if (preSubtitle) {
      preSubtitle.is_selected = false;
      preTrack = getTrackById(preSubtitle.code, tracks);
    }

    if (preTrack) {
      preTrack.oncuechange = () => { };
      const subEl: HTMLDivElement = videoRef.nextSibling as any;
      preTrack.mode = "disabled";
    }

    const nextSubtitle = titles[index];
    if (!nextSubtitle) {
      state.currentSubtitle = undefined;
      return;
    }

    let nextTrack = getTrackById(nextSubtitle.code, tracks);
    if (!nextTrack) {
      const newTrack = await loadTrack(nextSubtitle);
      if (newTrack) {
        videoRef.appendChild(newTrack);

        nextTrack = tracks[tracks.length - 1];
      }
    }
    if (nextTrack) {
      state.currentSubtitle = nextSubtitle;
      nextSubtitle.is_selected = true;
      nextTrack.mode = "hidden";
      nextTrack.oncuechange = (e) => {
        const cues: any = nextTrack?.activeCues;
        let cue = cues && cues[0];
        let idx = 0;
        const subEl: HTMLDivElement = videoRef.nextSibling as any;
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
  };

  const initSubtitle = async () => {
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
  };
};
