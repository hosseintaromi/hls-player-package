import styled from "@emotion/styled";

export const ModalOverlay = styled.div({
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  overflowX: "hidden",
  overflowY: "hidden",
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: "301",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ModalContent = styled.div(({ theme }) => ({
  color: theme.settingTextColor,
}));

export const ModalWrapper = styled.div(({ theme }) => ({
  border: `1px solid rgba(35, 35, 35, 1)`,
  borderRadius: "12px",
  position: "relative",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  overflowX: "hidden",
  overflowY: "auto",
  color: "#0f0f0f",
  backgroundColor: theme.settingBg,
  minWidth: "250px",
  maxWidth: "356px",
  maxHeight: "100%",
  direction: theme.dir,
}));

export const DialogTitle = styled.div(({ theme }) => ({
  fontSize: "1.25rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontWeight: "normal",
  height: "49px",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid #333",
  color: theme.settingTitleTextColor,
}));

export const DialogLabel = styled.label(({ theme }) => ({
  fontSize: theme.settingFontSize,
}));
