import React, { HTMLAttributes } from "react";
import styled from "@emotion/styled";
import { IconsType } from "../../@types/player.model";
import { useVideo } from "../../hooks/useVideo";

const IconWrapperStyle = styled.div(
  ({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.iconColor,
    "& svg": {
      height: theme.toolbarFontSize,
      width: theme.toolbarFontSize,
    },
  }),
  ({ isClickable }: { isClickable: boolean }) => ({
    cursor: isClickable ? "pointer" : "default",
  }),
);

type IconType = {
  type: keyof IconsType;
  isClickable: boolean;
} & HTMLAttributes<HTMLElement>;

const Icon = ({ type, onClick, ...other }: IconType) => {
  const {
    config: { icons },
  } = useVideo();
  return (
    <IconWrapperStyle onClick={onClick} {...other}>
      {icons[type]}
    </IconWrapperStyle>
  );
};

export default Icon;
