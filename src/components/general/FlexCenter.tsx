import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";

export const CenterBox = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const FlexCenter = ({ children }: HTMLAttributes<HTMLElement>) => (
  <CenterBox>{children}</CenterBox>
);
