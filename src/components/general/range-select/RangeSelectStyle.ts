import styled from "@emotion/styled";

export const GeneralStyleForRange = styled.div({
  /* @noflip */
  position: "relative",
  height: "23px",
  width: "100%",
});

export const ProgressBar = styled.div(({ theme }) => ({
  /* @noflip */
  width: "0%",
  height: "3px",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: "0",
  zIndex: "3",
  backgroundColor: theme.rangeFrontBg,
}));

export const Thumb = styled.div(({ theme }) => ({
  /* @noflip */
  height: "9px",
  width: "9px",
  top: "50%",
  transform: "translateY(-50%)",
  position: "absolute",
  left: "-9px",
  border: `solid 3px ${theme.rangeFrontBg}`,
  borderRadius: "50%",
  zIndex: "4",
  backgroundColor: theme.rangeFrontBg,
}));

export const TimeLine = styled.div(({ theme }) => ({
  /* @noflip */
  width: "100%",
  height: "3px",
  borderRadius: "3px",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: "0",
  zIndex: "1",
  backgroundColor: theme.rangeBackBg,
}));

export const Slider = styled.input({
  /* @noflip */
  cursor: "pointer",
  width: "100%",
  WebkitAppearance: "none",
  zIndex: "5",
  position: "absolute",
  inset: "0",
  opacity: "0",
  border: "none",
  margin: "0",

  "::-webkit-slider-thumb": {
    WebkitAppearance: "none",
    appearance: "none",
    width: "6px",
    height: "17px",
    background: "rgba(0, 188, 212, 1)",
  },
});
