/*
ui components
*/
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

type ButtonPropsType = {
  animation?: boolean;
};

export const bounce = keyframes`
  from {
    opacity: 1
  }
  
  to {
    opacity: 0;
    -webkit-transform: translate(-50%, -50%) scale(2);
    -o-transform: translate(-50%, -50%) scale(2);
    transform: translate(-50%, -50%) scale(2)
  }
  `;

export const ring = keyframes`

  from {
      transform: rotate(0deg);
    }
  to {
    transform: rotate(360deg);
    }
`;

export const VideoWrapper = styled.div({
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  boxSizing: "border-box",
  "> *": {
    boxSizing: "border-box",
  },
  ":before": {
    boxSizing: "border-box",
  },
  ":after": {
    boxSizing: "border-box",
  },
});

export const Video = styled.video({
  width: "100%",
  height: "100%",
  // backgroundColor: theme.colors.videoBg,
  backgroundColor: "#000",
});

export const Button = styled.button<ButtonPropsType>((props) => ({
  background: "transparent",
  border: "none",
  borderRadius: "50%",
  color: "white",
  padding: "20px",
  display: `${props.animation ? "none" : "block"}`,
  "img,svg": {
    width: "50px",
    height: "50px",
  },
}));

export const PlayIconWrapper = styled.div(
  {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "300",
    background: "rgba(0,0,0,.5)",
    borderRadius: "26px",
    width: "52px",
    height: "52px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
  },
  ({ isClicked }: { isClicked: boolean }) => ({
    animation: isClicked ? `${bounce} .5s linear 1 normal forwards` : "none",
    opacity: isClicked ? 1 : 0,
  }),
);

export const TopRightWrapper = styled.div({
  zIndex: "4",
  top: "0",
  display: "flex",
  position: "absolute",
  height: "50%",
  width: "40%",
  right: "0",
  justifyContent: "right",
  color: "white",
});

export const TopLeftWrapper = styled.div({
  color: "white",
  zIndex: "1",
  top: "0",
  display: "flex",
  position: "absolute",
  height: "50%",
  width: "40%",
  left: "0",
  justifyContent: "left",
});

export const PlayWrapper = styled.div({
  zIndex: "2",
  position: "absolute",
  height: "calc(100% - 70px)",
  width: "100%",
});

export const ToolBarWrapper = styled.div({
  position: "absolute",
  bottom: "0",
  height: "20%",
  width: "100%",
  maxHeight: "70px",
  fontSize: "25px",
  padding: "0 15px",
  zIndex: "2",
  background:
    "linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(0,0,0,0.6012780112044818) 78%)",
});

export const ToolBarPlayIcon = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export const Gradient = styled.div(
  ({ theme }) => ({
    transition: "opacity .25s cubic-bezier(0,0,.2,1)",
    paddingTop: "37px",
    bottom: 0,
    zIndex: 24,
    width: "100%",
    position: "absolute",
    pointerEvents: "none",
    background: `${theme.toolbarBg}`,
    height: "211px",
  }),
  ({ isFaded }: { isFaded: boolean }) => ({ opacity: isFaded ? 0 : 1 }),
);

export const MobileVideoWrapper = styled.div({
  width: "100%",
  position: "relative",
  overflow: "hidden",
  boxSizing: "border-box",
  "> *": {
    boxSizing: "border-box",
  },
  ":before": {
    boxSizing: "border-box",
  },
  ":after": {
    boxSizing: "border-box",
  },
});

export const MobileGradient = styled.div(
  ({ theme }) => ({
    transition: "opacity .25s cubic-bezier(0,0,.2,1)",
    top: 0,
    bottom: 0,
    zIndex: 24,
    width: "100%",
    position: "absolute",
    pointerEvents: "none",
    background: `${theme.toolbarBg}`,
  }),
  ({ isFaded }: { isFaded: boolean }) => ({ opacity: isFaded ? 0 : 1 }),
);

export const CustomVideoWrapper = styled.div({
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  boxSizing: "border-box",
  "> *": {
    boxSizing: "border-box",
  },
  ":before": {
    boxSizing: "border-box",
  },
  ":after": {
    boxSizing: "border-box",
  },
});
export const VideoWrapperBlue = styled.div({
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  boxSizing: "border-box",
  "> *": {
    boxSizing: "border-box",
  },
  ":before": {
    boxSizing: "border-box",
  },
  ":after": {
    boxSizing: "border-box",
  },
});

export const CustomPlayWrapper = styled.div(
  {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "300",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "opacity .25s cubic-bezier(0,0,.2,1)",
    width: "100%",
    maxWidth: "350px",

    svg: {
      width: "40px",
      height: "auto",
    },
  },
  ({ isFaded }: { isFaded: boolean }) => ({ opacity: isFaded ? 0 : 1 }),
);

export const PlayJumpIconWrapper = styled.div(
  {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "300",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "opacity .25s cubic-bezier(0,0,.2,1)",
    width: "100%",
    maxWidth: "350px",

    svg: {
      width: "40px",
      height: "auto",
    },
  },
  ({ isFaded }: { isFaded: boolean }) => ({ opacity: isFaded ? 0 : 1 }),
);

export const PlayJumpIcon = styled.div(
  {
    background: "rgba(0,0,0,.5)",
    borderRadius: "50%",
    width: "72px",
    height: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    svg: {
      width: "58px",
    },
  },
  ({ isClicked }: { isClicked: boolean }) => ({ opacity: isClicked ? 1 : 0 }),
);

export const PlayJumpIconFix = styled.div({
  background: "rgba(0,0,0,.5)",
  borderRadius: "50%",
  width: "72px",
  height: "72px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  svg: {
    width: "58px",
  },
});
