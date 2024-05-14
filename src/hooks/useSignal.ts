import { useEffect, useState } from "react";
import { SubjectType } from "../@types/useUpdate.model";

export const useSignal = <T>(subject: SubjectType<T>) => {
  const [signal, setSignal] = useState<T>(subject.value);

  useEffect(() => {
    const updateFun = subject.onUpdate((newValue) => setSignal(newValue));
    return () => updateFun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return signal;
};
