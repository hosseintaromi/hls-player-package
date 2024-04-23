const cashedImages: any = {};

export const loadSnapshotImage = (src: string, loaded: () => void) => {
  let cashedImage = cashedImages[src];
  if (!cashedImage) {
    cashedImages[src] = cashedImage = { loaded: false, listeners: [] };
    const image = new Image();
    image.src = src;
    image.onload = () => {
      cashedImage.loaded = true;
      cashedImage.listeners.forEach((listener: () => void) => {
        listener();
      });
      cashedImage.listeners = [];
    };
  }
  if (cashedImage.loaded) {
    loaded();
  } else {
    cashedImage.listeners.push(loaded);
  }
};
