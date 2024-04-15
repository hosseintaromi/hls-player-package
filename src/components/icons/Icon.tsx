import { HTMLAttributes } from "react";
import { IconsType } from "../../@types/player.model";
import styled from "@emotion/styled";
import React from "react";
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
	})
);
type IconType = {
	type: keyof IconsType;
	isClickable: boolean;
} & HTMLAttributes<HTMLElement>;
const Icon = ({ type, onClick, ...other }: IconType) => {
	const { icons } = useVideo();
	return (
		<IconWrapperStyle onClick={onClick} {...other}>
			{icons[type]}
		</IconWrapperStyle>
	);
};

export default Icon;
