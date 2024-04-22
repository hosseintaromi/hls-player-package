import React, { ReactNode } from "react";
import Icon from "../icons/Icon";
import { useTime } from "../../hooks/useTime";

const JumpBack = ({
	children,
	type,
}: {
	children?: ReactNode;
	type: "back" | "forward";
}) => {
	const { increaseTime, decreaseTime } = useTime();

	const jumpBack = () => {
		decreaseTime(10);
	};

	const JumpForward = () => {
		increaseTime(10);
	};

	return (
		<>
			{type === "back" ? (
				<Icon
					isClickable={true}
					onClick={jumpBack}
					type="jumpBack"
					className="vp-icon-jump-back"
				/>
			) : (
				<Icon
					isClickable={true}
					onClick={JumpForward}
					type="jumpForward"
					className="vp-icon-jump-forward"
				/>
			)}
		</>
	);
};

export default JumpBack;
