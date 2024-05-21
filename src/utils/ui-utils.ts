import { RefObject } from "react";

export function setRefStyle(
  ref: RefObject<HTMLElement>,
  styles: Partial<CSSStyleDeclaration>,
) {
  setStyle(ref.current!, styles);
}

export function setStyle(
  el: HTMLElement,
  styles: Partial<CSSStyleDeclaration>,
) {
  if (!el || !el.style) {
    return;
  }
  for (let key in styles) {
    el.style[key] = styles[key]!;
  }
}

export function setStyleVar(
  el: HTMLElement,
  vars: { [cssVar: string]: string },
) {
  for (let key in vars) {
    el.style.setProperty(key, vars[key]!);
  }
}
