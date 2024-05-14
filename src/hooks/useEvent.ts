import { MutableRefObject, useRef } from "react";
import { useFn } from "./useFn";
import { useInit } from "./useInit";

const MIN_PRESS_TIME = 500;
const MAX_TAP_TIME = 300;

export enum EventType {
  None = "None",
  Tap = "Tap",
  RightClick = "RightClick",
  DoubleClick = "DoubleClick",
  Hover = "Hover",
  Press = "Press",
  HorizontalSwipe = "HorizontalSwipe",
  VerticalSwipe = "VerticalSwipe",
}

export interface TouchEvent {
  x: number;
  y: number;
  moveX: number;
  moveY: number;
  e: Event;
}

export interface EventHandler {
  onTouchStart?: (e: TouchEvent) => void;
  onTouchMove?: (e: TouchEvent) => void;
  onTouchEnd?: (e: TouchEvent) => void;
  onTap?: (e: Event) => void;
  onRightClick?: (e: Event) => void;
  onDoubleClick?: (e: Event) => void;
  onPress?: (e: Event) => void;
  onMouseover?: (e: Event) => void;
  onMouseout?: (e: Event) => void;
}

export interface Position {
  x: number;
  y: number;
}

export const useEvent = (
  elRef: MutableRefObject<HTMLElement | undefined> | undefined,
  eventType: EventType,
  events: EventHandler,
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const startPositionRef = useRef<Position | undefined>();
  const touchRef = useRef<number[]>([]);
  const isTouchMoveRef = useRef(false);
  const startSwipeRef = useRef<boolean>();
  const touchEventRef = useRef<TouchEvent>();

  const getCurrentTime = () => Date.now();

  const getTouchEvent = (e: Event | any) => {
    if (!e.touches) {
      return;
    }
    const startPosition = startPositionRef.current;
    const touch = e.touches[e.touches.length - 1];
    const x = e.clientX || touch.clientX;
    const y = e.clientY || touch.clientY;
    return {
      x,
      y,
      moveX: x - (startPosition?.x || 0),
      moveY: y - (startPosition?.y || 0),
      e,
    } as TouchEvent;
  };

  const resetTouchRef = () => {
    touchRef.current = [];
  };

  const handleTap = (e: Event) => {
    const touches = touchRef.current;
    if (touches.length !== 1 || isTouchMoveRef.current) {
      resetTouchRef();
      return;
    }

    resetTouchRef();
    if (getCurrentTime() - touches[0] > MAX_TAP_TIME) {
      return;
    }
    touchRef.current = [];
    events?.onTap?.(e);
  };

  const handleDoubleClick = (e: Event) => {
    const touches = touchRef.current;
    if (
      getCurrentTime() - touches[touches.length - 1] > MAX_TAP_TIME ||
      isTouchMoveRef.current
    ) {
      resetTouchRef();
      return;
    }

    if (touches.length < 2) {
      return;
    }
    resetTouchRef();
    if (touches.length === 2 && touches[1] - touches[0] < MAX_TAP_TIME) {
      events?.onDoubleClick?.(e);
    }
  };

  const clearTimer = () => {
    const timer = timeoutRef.current;
    if (!timer) {
      return;
    }
    clearTimeout(timer);
    timeoutRef.current = undefined;
  };

  const handlePress = (e: Event) => {
    clearTimer();
    resetTouchRef();
    timeoutRef.current = setTimeout(() => {
      if (!isTouchMoveRef.current) {
        events.onPress?.(e);
      }
    }, MIN_PRESS_TIME);
  };

  const handleRightClick = (e: Event) => {
    e.preventDefault();
    events.onRightClick?.(e);
  };

  const handleSwipe = (e: Event) => {
    const touchEvent = getTouchEvent(e);
    touchEventRef.current = touchEvent;
    if (timeoutRef.current) {
      if (startSwipeRef.current) {
        events.onTouchMove?.(touchEvent as any);
      }
      return;
    }
    resetTouchRef();
    const isVertical = eventType === EventType.VerticalSwipe;
    // timeoutRef.current = setTimeout(() => {
    if (!isTouchMoveRef.current) {
      return;
    }
    const startPosition = startPositionRef.current;
    if (!touchEvent || !startPosition) {
      return;
    }
    const moveX = Math.abs(touchEvent.moveX);
    const moveY = Math.abs(touchEvent.moveY);
    if (moveX < moveY && isVertical) {
      startSwipeRef.current = true;
      events.onTouchStart?.({
        ...touchEvent,
        x: startPosition.x,
        y: startPosition.y,
      });
      events.onTouchMove?.(touchEvent);
    } else if (moveX >= moveY && !isVertical) {
      startSwipeRef.current = true;
      events.onTouchStart?.({
        ...touchEvent,
        x: startPosition.x,
        y: startPosition.y,
      });
      events.onTouchMove?.(touchEvent);
    }
    // }, MIN_MOVE_TIME);
  };

  const handleEndEvents = (e: Event) => {
    switch (eventType) {
      case EventType.DoubleClick:
        handleDoubleClick(e);
        break;
      case EventType.Tap:
        handleTap(e);
        break;
      default:
        resetTouchRef();
        break;
    }
  };

  const removeListener = (
    type: string,
    handle: (e: Event) => void,
    forElement?: boolean,
  ) => {
    if (!elRef?.current) return;
    (forElement ? elRef.current : window).removeEventListener(
      type,
      handle as EventListener,
    );
  };

  const addListener = (
    type: string,
    handle: (e: Event) => void,
    forElement?: boolean,
  ) => {
    if (!elRef?.current) return;
    (forElement ? elRef.current : window).addEventListener(
      type,
      handle as EventListener,
    );
  };

  const detectMove = (e: Event) => {
    const touchEvent = getTouchEvent(e);
    if (
      Math.abs(touchEvent?.moveX || 0) > 1 ||
      Math.abs(touchEvent?.moveY || 0) > 1
    ) {
      return true;
    }
    return false;
  };

  const handleTouchMove = useFn((e: Event) => {
    isTouchMoveRef.current = detectMove(e);
    switch (eventType) {
      case EventType.HorizontalSwipe:
      case EventType.VerticalSwipe:
        handleSwipe(e);
        break;
    }
  });

  const listenMove = (listen: boolean) => {
    if (listen && !isTouchMoveRef.current) {
      addListener("mousemove", handleTouchMove);
      addListener("touchmove", handleTouchMove);
    } else if (!listen) {
      isTouchMoveRef.current = false;
      removeListener("mousemove", handleTouchMove);
      removeListener("touchmove", handleTouchMove);
    }
  };

  const handleTouchEnd = useFn((e: Event) => {
    handleEndEvents(e);
    removeListener("mouseup", handleTouchEnd);
    removeListener("touchend", handleTouchEnd);
    listenMove(false);
    clearTimer();
    if (startSwipeRef.current) {
      events.onTouchEnd?.(touchEventRef.current!);
      startSwipeRef.current = undefined;
    }
  });

  const handleStartEvents = (e: Event) => {
    switch (eventType) {
      case EventType.Press:
        handlePress(e);
        break;
    }
  };

  const handleTouchStart = useFn((e: Event) => {
    addListener("mouseup", handleTouchEnd);
    addListener("touchend", handleTouchEnd);
    const touches = touchRef.current;
    if (touches.length > 2) {
      touchRef.current.length = 0;
    }
    touches.push(getCurrentTime());
    startPositionRef.current = touchEventRef.current = getTouchEvent(e);

    listenMove(true);
    handleStartEvents(e);
  });

  const handleMouseover = useFn((e: Event) => {
    events?.onMouseover?.(e);
  });

  const handleMouseout = useFn((e: Event) => {
    events?.onMouseout?.(e);
  });

  const addListeners = () => {
    if (!elRef?.current || eventType === EventType.None) {
      return;
    }
    if (eventType === EventType.Hover) {
      addListener("mouseover", handleMouseover, true);
      addListener("mouseout", handleMouseout, true);
      return () => {
        removeListener("mouseover", handleMouseover, true);
        removeListener("mouseout", handleMouseout, true);
      };
    }
    if (eventType === EventType.RightClick) {
      addListener("contextmenu", handleRightClick, true);
      return () => {
        removeListener("contextmenu", handleDoubleClick, true);
      };
    }
    addListener("mousedown", handleTouchStart, true);
    addListener("touchstart", handleTouchStart, true);
  };

  const removeListeners = () => {
    listenMove(false);
    removeListener("mousedown", handleTouchStart, true);
    removeListener("mouseup", handleTouchEnd);
    removeListener("touchstart", handleTouchStart, true);
    removeListener("touchend", handleTouchEnd);
    clearTimer();
  };

  useInit(() => {
    addListeners();
    return () => {
      removeListeners();
    };
  });

  if (!elRef) {
    return {
      updateRef: () => {},
    };
  }

  return {
    updateRef: () => {
      addListeners();
    },
  };
};
