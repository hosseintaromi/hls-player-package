import { useState } from "react";
import { SubjectType } from "../@types/useUpdate.model";
import { useInit } from "./useInit";

export const useSignal = <T>(subject: SubjectType<T>) => {
  const [signal, setSignal] = useState<T>(subject.value);

  useInit(() => {
    const updateFun = subject.onUpdate((newValue) => setSignal(newValue));
    return () => updateFun();
  });

  return signal;
};
