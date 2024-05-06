import { Global, css } from "@emotion/react";

export const GlobalStyles = () => (
  <Global
    styles={css`
      .hide-tools .controlled-tool {
        visibility: hidden;
      }
    `}
  />
);
