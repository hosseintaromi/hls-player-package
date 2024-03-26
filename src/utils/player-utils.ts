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
