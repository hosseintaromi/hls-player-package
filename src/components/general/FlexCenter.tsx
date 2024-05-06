import styled from "@emotion/styled";
import { HTMLAttributes } from "react";

export const CenterBox = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const FlexCenter = ({ children }: HTMLAttributes<HTMLElement>) => (
  <CenterBox>{children}</CenterBox>
);
