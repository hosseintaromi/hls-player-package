import styled from "@emotion/styled";

export const ToolbarWrapper = styled.div({
  position: "absolute",
  zIndex: "100",
  bottom: "0",
  left: "0.75rem",
  right: "0.75rem",
});

export const SettingRightSection = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "22px",
});

export const SettingLeftSection = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "22px",
});

export const SettingItemWrapper = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "10px",

  "&.blue-setting-wrapper": {
    paddingBottom: "18px",
    paddingTop: "8px",
  },
});

export const TimeDivider = styled.span(() => ({
  margin: "0 5px",
}));

export const TimeCounter = styled.span(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  color: `${theme.iconColor}`,
  fontSize: theme.settingFontSize,
  "&.blue-counter": {
    height: "auto",
    width: "100%",
    justifyContent: "space-between",
  },
}));

export const VolumeWrapper = styled.div(
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  ({ gap }: { gap: boolean }) => ({ gap: gap ? "10px" : "0" }),
);

export const MobileToolbarWrapper = styled.div(
  {
    position: "absolute",
    zIndex: "10",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",

    ".media-timeLine": {
      position: "absolute",
      bottom: "16px",
      left: "32px",
      right: "32px",
      width: "auto",
    },
    ".setting-item-wrapper": {
      position: "absolute",
      bottom: "45px",
      left: "32px",
      right: "32px",
      width: "auto",
    },
  },
  ({ isFaded }: { isFaded: boolean }) => ({ opacity: isFaded ? 0 : 1 }),
);
export const MobileSettingPlay = styled.div({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
export const MobileTopToolbar = styled.div(({ theme }) => ({
  color: `${theme.iconColor}`,
  position: "absolute",
  right: "16px",
  top: "16px",
  display: "flex",
  alignItems: "center",
  ".setting": {
    marginLeft: "8px",
  },
}));
export const IconButton = styled.button({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  width: "48px",
  height: "48px",
  padding: 0,
  border: "none",
  outline: "none",
  font: "inherit",
  textTransform: "inherit",
  color: "inherit",
  background: "transparent",
});
