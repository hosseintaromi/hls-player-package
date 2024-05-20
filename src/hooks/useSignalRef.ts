import { useRef } from "react";
import { SubjectType } from "../@types/useUpdate.model";
import { useInit } from "./useInit";

export const useSignalRef = <T>(subject: SubjectType<T>) => {
  const signalRef = useRef<T>(subject.value);

  useInit(() => {
    subject.onUpdate((newValue) => {
      signalRef.current = newValue;
    });
  });

  return signalRef;
};
