/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";

export const useFn = <T extends Function>(callback: T) =>
  useCallback(callback, []);
