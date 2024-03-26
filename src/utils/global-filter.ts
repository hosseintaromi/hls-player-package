export const calculatePlayerTime = (timeInSecond: number) => {
  let data = "";
  if (timeInSecond == null) {
    return "";
  }
  const ms = timeInSecond * 1000;
  let hours: string | number = Math.floor(Math.floor(ms / (1000 * 60 * 60)));
  let minutes: string | number = Math.floor((ms / 1000 / 60) % 60);
  let seconds: string | number = Math.floor((ms / 1000) % 60);
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  data = (hours !== "00" ? hours + ":" : "00:") + minutes + ":" + seconds;
  if (data === "NaN:NaN:NaN") {
    data = "00:00";
  }
  return data;
};
