/* eslint-disable react-hooks/exhaustive-deps */
import { EffectCallback, useEffect } from "react";

export const useInit = (effect: EffectCallback) => {
  useEffect(effect, []);
};
