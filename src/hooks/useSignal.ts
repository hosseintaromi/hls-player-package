import { useEffect, useState } from "react";
import { SubjectType } from "../@types/useUpdate.model";

export const useSignal = <T>(subject: SubjectType<T>) => {
  const [signal, setSignal] = useState<T>(subject.value);

  useEffect(() => {
    subject.onUpdate((newValue) => setSignal(newValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return signal;
};
