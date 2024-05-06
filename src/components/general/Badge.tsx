import styled from "@emotion/styled";
import { ReactNode } from "react";

type BadgePropsType = {
  children: ReactNode;
  isFixed?: boolean;
  colors?: "primary" | "danger" | "info" | "warning" | "success";
};

const BadgeWrapper = styled.span(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  fontSize: "11px",
  padding: "5px 6px 2px",
  lineHeight: 1,

  "&.badge-primary": {
    backgroundColor: theme.iconColor,
    color: theme.settingBg,
  },

  "&.badge-danger": {
    backgroundColor: "#e50913",
    color: "white",
  },

  "&.badge-success": {
    backgroundColor: "#198754",
    color: "white",
  },

  "&.badge-info": {
    backgroundColor: "#0dcaf0",
    color: "#000",
  },

  "&.badge-warning": {
    backgroundColor: "#ffc107",
    color: "#000",
  },
  "&.badge-fixed": {
    position: "absolute",
    bottom: 0,
  },
}));

const Badge = ({ children, isFixed, colors }: BadgePropsType) => (
  <BadgeWrapper
    className={`${!colors ? "badge-primary" : `badge-${colors}`} ${
      isFixed ? "badge-fixed" : ""
    }`}
  >
    {children}
  </BadgeWrapper>
);
export default Badge;
