import React, { HTMLAttributes, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { IconsType } from "../../@types/player.model";
import { useVideo } from "../../hooks/useVideo";
import { useSensitiveArea } from "../../hooks/useSensitiveArea";

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
  isSensitive?: boolean;
} & HTMLAttributes<HTMLElement>;

const Icon = ({ type, onClick, isSensitive, ...other }: IconType) => {
  const iconRef = useRef<HTMLDivElement>(null);

  const {
    config: { icons },
  } = useVideo();

  const { setSensitive } = useSensitiveArea();

  useEffect(() => {
    if (isSensitive && iconRef.current) {
      setSensitive(iconRef.current);
    }
  }, [isSensitive, setSensitive]);

  return (
    <IconWrapperStyle ref={iconRef} onClick={onClick} {...other}>
      {icons[type]}
    </IconWrapperStyle>
  );
};

export default Icon;
