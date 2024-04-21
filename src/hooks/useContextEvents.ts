import { useEffect, useRef } from "react";
import { GenericEvents } from "../@types/player.model";

export const useContextEvents = <Y extends Record<string, string>, T = any>(
  context: React.Context<T>,
) => {
  const listenersRef = useRef<{
    [key: string]: ((data?: any) => void)[];
  }>({});
  const eventContext: any = context;
  if (!eventContext.__listeners) {
    eventContext.__listeners = {};
    eventContext.__events = {};
  }

  const bindCall = (event: Extract<keyof Y, string>) => {
    const __listeners = eventContext.__listeners;
    eventContext.__events[event] = (data?: any) => {
      (__listeners[event] || []).forEach((listener: any) => {
        listener?.(data);
      });
    };
  };

  const listen = (events?: GenericEvents<Y>) => {
    if (!events) {
      return;
    }
    const __listeners = eventContext.__listeners;
    for (let event in events) {
      if (!__listeners[event]) {
        bindCall(event);
        __listeners[event] = [];
      }
      __listeners[event].push(events[event]);
      let listeners: any[] = listenersRef.current[event];
      if (!listeners) {
        listeners = listenersRef.current[event] = [];
      }
      listeners.push(events[event]);
    }
  };

  useEffect(
    () => () => {
      const __listeners = eventContext.__listeners;
      const localListeners = listenersRef.current;
      for (let key in localListeners) {
        const items = localListeners[key];
        items.forEach((event: any) => {
          const index = __listeners[key].findIndex((x: any) => x === event);
          __listeners[key].splice(index, 1);
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    listen,
    call: eventContext.__events as GenericEvents<Y>,
  };
};

export default useContextEvents;
