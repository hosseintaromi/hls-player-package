export const findBufferIndex = (el: HTMLVideoElement) => {
  const buffered = el.buffered;
  const currentTime = el.currentTime;
  for (let i = 0; i < buffered.length; i++) {
    if (currentTime >= buffered.start(i) && currentTime <= buffered.end(i)) {
      return {
        length: buffered.length,
        index: i,
      };
    }
  }
  return {
    length: buffered.length,
    index: -1,
  };
};

export const formatDuration = (
  duration: any,
  milisecond?: boolean
) => {
  duration = parseInt(duration as any);
  if (isNaN(duration)) {
    duration = 0;
  }

  const timeSeconds = milisecond ? Math.floor(duration / 1000) : duration;
  let hours = Math.floor(timeSeconds / 3600);
  let minutes = Math.floor((timeSeconds % 3600) / 60);
  let seconds = timeSeconds % 60;

  let result = (hours ? hours + ":" : "") + minutes + ":" + seconds;

  return result.replace(/:(\d(?::|$))/g, ":0$1");
};
