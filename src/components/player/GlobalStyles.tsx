import { Global, css } from "@emotion/react";
import React from "react";

export const GlobalStyles = () => (
  <Global
    styles={css`
      .hide-tools .controlled-tool {
        visibility: hidden;
      }
    `}
  />
);
