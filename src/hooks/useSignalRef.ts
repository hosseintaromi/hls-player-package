import { useEffect, useRef } from "react";
import { SubjectType } from "../@types/useUpdate.model";

export const useSignalRef = <T>(subject: SubjectType<T>) => {
  const signalRef = useRef<T>(subject.value);

  useEffect(() => {
    subject.onUpdate((newValue) => {
      signalRef.current = newValue;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return signalRef;
};
