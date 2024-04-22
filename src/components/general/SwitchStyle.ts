import styled from "@emotion/styled";

export const SwitchButton = styled.button({
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

export const Spanner = styled.div({
  width: "36px",
  height: "14px",
  position: "relative",
  display: "flex",
});

export const PauseSpanner = styled.div({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: "6px",
  width: "20px",
  height: "20px",
});

export const PlaySpanner = styled.div({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: "22px",
  width: "20px",
  height: "20px",
});

export const ToggleButton = styled.button({
  padding: 0,
  border: "none",
  outline: "none",
  font: "inherit",
  textTransform: "inherit",
  color: "inherit",
  background: "transparent",
  position: "relative",
  display: "inline-block",
  height: "20px",
  width: "40px",
  verticalAlign: "middle",
});

export const ButtonTrack = styled.div({
  position: "absolute",
  top: 0,
  height: "20px",
  width: "40px",
  borderRadius: "10px",
  backgroundColor: "#ccc",
});

export const ButtonCircle = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "20px",
  height: "20px",
  borderRadius: "100%",
  backgroundColor: "#909090",
});
