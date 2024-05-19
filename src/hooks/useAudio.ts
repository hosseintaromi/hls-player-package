import { useCallback, useContext } from "react";
import VideoPlayerContext from "../contexts/VideoPlayerContext";
import { useVideo } from "./useVideo";
import { useUpdate } from "./useUpdate";
import { AudioType } from "../@types";

export const useAudio = () => {
  const {
    config: { audioTracks, src },
    getVideoRef,
  } = useVideo();
  const context = useContext(VideoPlayerContext);
  const audioState = useUpdate(
    context.hls?.audioTrack,
    "audio",
    VideoPlayerContext,
  );

  const getAudioTracks = useCallback(
    () =>
      // context.hls?.audioTracks.filter((item) =>
      //   audioTracks.length ? audioTracks.includes(item.name) : true,
      // ),
      context.state.audioTracks,
    [],
  );

  const getTrackById = (trackId: string, tracks: TextTrackList) => {
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      if (track.id === trackId) {
        return track;
      }
    }
  };
  const getAudioTrack = useCallback(
    () => context.hls?.audioTrack,
    [context.hls?.audioTrack],
  );
  const addTrack = (videoEl: HTMLVideoElement, audio: AudioType) =>
    new Promise<any>((resolve, reject) => {
      const track = document.createElement("audio");
      track.id = audio.name;
      track.src = audio.url;
      track.addEventListener("load", () => {
        resolve(track);
      });
      track.addEventListener("error", () => {
        reject(track);
      });
      track.play();
      videoEl.appendChild(track);
      videoEl.muted = true;
      let nextTrack = getTrackById(audio.name, videoEl.textTracks);
      if (nextTrack) {
        nextTrack.mode = "hidden";
      }
    });

  const loadTrack = async (videoEl: HTMLVideoElement, audio: AudioType) => {
    try {
      const res = await fetch(audio.url);
      const blob = await res.blob();
      // videoEl.aud;
      console.log((videoEl as any).audioTracks);
      for (let i = 0; i < (videoEl as any).audioTracks.length; i++) {
        // audioTracks[i].enabled = false; // Mute all tracks by default
        console.log(audioTracks[i]);
      }
      // const vttUrl = await toWebVTT(blob);
      const newTrack = new Audio(audio.url);
      console.log("newTrack", newTrack);
      const track = await addTrack(videoEl, audio);
      // return track;
    } catch (exp) {
      console.log(exp);
      return null;
    }
  };

  const changeAudioTrack = (index: number) => {
    // if (context.hls) context.hls.audioTrack = index;
    // else
    if (context.state.audioTracks) {
      const track = context.state.audioTracks[index];
      const videoEl = getVideoRef();
      if (!videoEl) return;
      loadTrack(videoEl, track);
    }
    audioState.update(index);
  };

  const initAudio = useCallback(() => {
    const state = context.state;
    const tracks: AudioType[] = [];
    console.log(state.metaData);
    if (context.hls && state.metaData) {
      const lines = state.metaData.lines;
      if (lines) {
        let baseUrl = state.metaData.baseUrl;
        const lastSlashIndex = baseUrl.lastIndexOf("/");
        baseUrl = baseUrl.substring(0, lastSlashIndex + 1);
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const len = tracks.length;
          if (line.indexOf("TYPE=AUDIO") !== -1) {
            try {
              const url: string[] = line
                .split(",")
                .filter((param) => param.toUpperCase().indexOf("URI=") === 0);
              const groupId: string[] = line
                .split(",")
                .filter(
                  (param) => param.toUpperCase().indexOf("GROUP-ID=") === 0,
                );
              const name: string[] = line
                .split(",")
                .filter((param) => param.toUpperCase().indexOf("NAME=") === 0);
              const language: string[] = line
                .split(",")
                .filter(
                  (param) => param.toUpperCase().indexOf("LANGUAGE=") === 0,
                );
              if (url.length === 1) {
                tracks[len] = {
                  name: name[0].split("=")[1].slice(1, -1),
                  url: baseUrl + url[0].split("=")[1].slice(1, -1),
                  groupId: groupId[0].split("=")[1].slice(1, -1),
                  lang: language[0].split("=")[1].slice(1, -1),
                };
              }
            } catch (exp) {
              break;
            }
          }
        }
        console.log("audio", tracks);
        if (state.currentLevelIndex) {
          // const audiId = state.levels?.[state.currentLevelIndex].audio;
          // state.audioTracks = tracks.filter(
          //   (track) => !track.groupId || track.groupId === audiId,
          // );
        }
        state.audioTracks = tracks;
        console.log(state.audioTracks);
        // levelsState.update(
        //   state.levels?.map((level) => ({ level: level.level })) || [],
        // );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useVideo({
    onReady: () => {
      initAudio();
    },
  });

  return {
    getAudioTracks,
    getAudioTrack,
    changeAudioTrack,
    currentAudioTrack: audioState.subject,
  };
};
