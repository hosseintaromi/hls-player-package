import { useEffect } from "react";

let __onUpdateContext = {};

export const useUpdate = <T>(
  value: T,
  key: string,
  context?: React.Context<any>,
) => {
  const eventContext: any = context || __onUpdateContext;
  if (!eventContext.__states) {
    eventContext.__states = {};
  }

  const update = (newValue: T) => {
    const __states = eventContext.__states;

    (__states[key] || []).forEach((listener: any) => {
      listener?.(newValue);
    });
  };

  const onUpdate = (listener: (newValue: T) => void) => {
    const __states = eventContext.__states;
    if (!__states[key]) {
      __states[key] = [];
    }
    __states[key].push(listener);

    return () => {
      const listenerIndex = __states[key].findIndex(listener);
      __states[key].splice(listenerIndex, 1);
    };
  };

  useEffect(
    () => () => {
      delete eventContext.__states[key];
    },
    [eventContext.__states, key],
  );

  return { subject: { onUpdate, value }, update };
};
