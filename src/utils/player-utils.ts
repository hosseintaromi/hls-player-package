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

export const formatDuration = (duration: any, milisecond?: boolean) => {
  duration = parseInt(duration as any, 10);
  if (Number.isNaN(duration)) {
    duration = 0;
  }

  const timeSeconds = milisecond ? Math.floor(duration / 1000) : duration;
  let hours = Math.floor(timeSeconds / 3600);
  let minutes = Math.floor((timeSeconds % 3600) / 60);
  let seconds = timeSeconds % 60;

  let result = `${(hours ? `${hours}:` : "00:") + minutes}:${seconds}`;

  return result.replace(
    /(?:(\d{1,2}):)?(\d{1,2}):(\d{1,2})/g,
    function (match, hour, minute, second) {
      let formattedTime = `${`0${hour}`.slice(-2)}:${`0${minute}`.slice(
        -2,
      )}:${`0${second}`.slice(-2)}`;

      return formattedTime;
    },
  );
};

export const toSecond = (time: string) => {
  const timeArr = time.trim().split(":");
  return (
    Number(timeArr[0]) * 3600 + Number(timeArr[1]) * 60 + Number(timeArr[2])
  );
};
