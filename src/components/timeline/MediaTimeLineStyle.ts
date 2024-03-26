import styled from "@emotion/styled";

export const ThumbCursor = styled.div({
  position: "absolute",
  width: "4px",
  height: "4px",
  background: "rgba(33, 33, 33, 0.6)",
  bottom: "12px",
  zIndex: "3",
  display: "none",

});
export const GeneralStyleForRange = styled.div({
  position: "relative",
  height: "23px",
  width: "100%",
  marginTop: "6px",
});
export const BufferSize = styled.span(({ theme }) => ({
  width: "0%",
  height: "3px",
  borderRadius: "3px",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: "0",
  zIndex: "2",
  background: theme.bufferBg,
}));
export const Bubble = styled.output({
  color: "white",
  padding: "4px",
  position: "absolute",
  background: "rgba(33, 33, 33, 0.6)",
  borderRadius: "8px",
  left: "300px",
  zIndex: "5",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  bottom: "30px;",
  display: "none",


  span: {
    marginTop: "3px",
  },



  ":after": {
    content: '""',
    position: "absolute",
    width: "0px",
    height: "0px",
    background: "rgba(33, 33, 33, 0.6)",
    bottom: "-105px",
    left: "50%",
  },
});
