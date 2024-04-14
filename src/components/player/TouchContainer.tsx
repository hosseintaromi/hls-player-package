import React, { ReactNode, useEffect, useRef } from "react";
import { usePlayerContext } from "../../hooks/usePlayerContext";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";
import { PlayerEventsType } from "../../@types/player.model";
import useContextEvents from "../../hooks/useContextEvents";
import { useAds } from "../../hooks/useAds";
import { useTime } from "../../hooks/useTime";

const TouchContainer = ({
	children,
	onShow,
	canPlayOnClick,
}: {
	children: ReactNode;
	canPlayOnClick: boolean;
	onShow: (show: boolean) => void;
}) => {
	const isPlayRef = useRef<boolean>();
	const isShowRef = useRef<boolean>();
	const isSettingOpenRef = useRef<boolean>();
	const isShowToolbarRef = useRef<boolean>();
	const timeoutRef = useRef<NodeJS.Timeout | undefined>();
	const { listen } = useContextEvents<PlayerEventsType>(VideoPlayerContext);
	const { showToolbar } = useAds();

	const { increaseTime, decreaseTime } = useTime();
	const { timeForHideEl, changePlayPause, keyControl } = usePlayerContext({
		onPlayPause: (play: boolean) => {
			isPlayRef.current = play;
			hideIfIdle();
		},
	});

	const setIsShow = (show: boolean) => {
		if (show !== isShowRef.current) {
			isShowRef.current = show;
			onShow(show);
		}
	};

	const hideIfIdle = () => {
		if (!showToolbar()) {
			setIsShow(false);
			return;
		}
		setIsShow(true);
		if (!isPlayRef.current) return;
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			if (
				isPlayRef.current &&
				!isSettingOpenRef.current &&
				!isShowToolbarRef.current
			) {
				setIsShow(false);
			}
		}, timeForHideEl);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		hideIfIdle();
		if (!keyControl) return;
		if (e.key === "ArrowRight") increaseTime(10);
		if (e.key === "ArrowLeft") decreaseTime(10);
		if (e.key === "Enter" && isPlayRef.current !== undefined) {
			changePlayPause(!isPlayRef.current);
		}
	};

	useEffect(() => {
		listen({
			onChangeSetting: (e) => {
				isSettingOpenRef.current = e;
			},
			onActivateControls: (e) => {
				isShowToolbarRef.current = e;
			},
		});

		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("mousedown", hideIfIdle);
		window.addEventListener("touchstart ", hideIfIdle);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("mousedown", hideIfIdle);
			window.removeEventListener("touchstart", hideIfIdle);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			id="touch-container"
			onMouseMove={hideIfIdle}
			onTouchStart={hideIfIdle}
			onMouseDown={hideIfIdle}
			onTouchMove={hideIfIdle}
			style={{ width: "100%", height: "100%", position: "relative" }}
		>
			{children}
		</div>
	);
};

export default TouchContainer;
