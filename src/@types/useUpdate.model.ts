export type SubjectType<T> = {
  value: T;
  onUpdate: (listener: (newValue: T) => void) => () => void;
};
