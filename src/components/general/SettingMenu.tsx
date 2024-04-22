import styled from "@emotion/styled";
import React from "react";

const SettingMenuWrapper = styled.div({
  transition: "all 0.3s ease",
  opacity: "0",
  width: "100%",
  bottom: "0",
  display: "none",
});

export const SettingMenu = ({
  children,
  myRef,
}: {
  children: JSX.Element[] | JSX.Element;
  myRef: React.RefObject<HTMLDivElement>;
}) => <SettingMenuWrapper ref={myRef}>{children}</SettingMenuWrapper>;
