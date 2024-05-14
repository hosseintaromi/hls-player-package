import { useInit } from "./useInit";

export const useDisableSelection = () => {
  useInit(() => {
    const handleSelect = (e: Event) => {
      e.preventDefault();
    };
    window.addEventListener("selectstart", handleSelect);
    return () => {
      window.removeEventListener("selectstart", handleSelect);
    };
  });
};
