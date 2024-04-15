import React, { useCallback, useEffect, useRef, useState } from "react";
import RangeSelect from "../general/range-select/RangeSelect";
import { useVideo } from "../../hooks/useVideo";
import { OnUpdateTimeType } from "../../@types/player.model";
import {
	Bubble,
	BufferSize,
	GeneralStyleForRange,
	ThumbCursor,
} from "./MediaTimeLineStyle";
import Snapshot, { SnapshotModel } from "../tools/Snapshot";
import { formatDuration } from "../../utils/player-utils";
import { useTime } from "../../hooks/useTime";

type ChangeRangeSelectType = {
	calcInputVal: (e: number, updateParent: boolean) => void;
	toggleThumb: (isShow: boolean) => void;
};

const TimeLine = () => {
	const controllerRef = useRef<ChangeRangeSelectType>({
		calcInputVal: () => {},
		toggleThumb: () => {},
	});
	const [hoverTime, setHoverTime] = useState<number | string>();
	const [hoverValue, setHoverValue] = useState<number | string>();
	const [hoverPercent, setHoverPercent] = useState<number>();

	const snapshots = useRef<SnapshotModel[]>([]);

	const playStateRef = useRef<boolean>();
	const snapShotBoxCursor = useRef<HTMLDivElement>(null);
	const snapShotBox = useRef<HTMLOutputElement>(null);

	const duration = useRef(0);
	var percentage = 0;
	var timeOut: ReturnType<typeof setTimeout>;

	const { changeTime } = useTime();
	const { getIsPlay, changePlayPause, thumbnail } = useVideo({
		onReady: (e) => {
			duration.current = e.duration;
		},
		onUpdateTime: (e: OnUpdateTimeType) => {
			duration.current = e.duration;
			percentage = e.percentage;
			controllerRef.current.calcInputVal(percentage, false);
		},
		onUpdateBuffer: (e: number) => {
			const buffer_size = document.getElementById("buffer-size");
			if (buffer_size)
				buffer_size.style.width = `${JSON.stringify(Math.round(e))}%`;
		},
	});

	const rangeSelectChangeVideoTime = useCallback((e: number) => {
		changeTime((e * duration.current) / 100);
	}, []);

	const setBubble = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		const event: any = e.nativeEvent;
		const offsetX = event.offsetX;
		if (!event.target) return;

		const bubbleEl = snapShotBox.current;
		const bubbleCursorEl = snapShotBoxCursor.current;

		if (!bubbleEl || !bubbleCursorEl) return;
		const halfBubbleWidth = bubbleEl.offsetWidth / 2;
		bubbleEl.style.left = `${Math.max(
			halfBubbleWidth,
			Math.min(offsetX, event.target.clientWidth - halfBubbleWidth)
		)}px`;
		bubbleEl.style.marginLeft = `-${65}px `;
		bubbleCursorEl.style.left = `${Math.max(
			-1,
			Math.min(offsetX, event.target.clientWidth) + -1
		)}px `;
		setHoverTime(
			((offsetX / event.target.clientWidth) * 100 * duration.current) /
				100
		);

		setHoverPercent((offsetX / event.target.clientWidth) * 100);

		const val = hoverPercent ? hoverPercent : 0;

		setHoverValue((val * duration.current) / 100);
	};

	const changeShowBubble = (e: boolean) => {
		const bubbleEl = snapShotBox.current;
		const bubbleCursorEl = snapShotBoxCursor.current;

		if (!bubbleEl || !bubbleCursorEl) return;
		if (e) {
			controllerRef.current.toggleThumb(true);
			bubbleEl.style.display = "flex";
			bubbleCursorEl.style.display = "flex";
		} else {
			controllerRef.current.toggleThumb(false);
			bubbleCursorEl.style.display = "none";
			bubbleEl.style.display = "none";
		}
	};
	const toInt = (value: string) => Number(value);
	const toSecond = (time: string) => {
		const timeArr = time.trim().split(":");
		return (
			toInt(timeArr[0]) * 3600 +
			toInt(timeArr[1]) * 60 +
			toInt(timeArr[2])
		);
	};
	useEffect(() => {
		if (thumbnail)
			fetch(thumbnail)
				.then((res) => res.text())
				.then((text) => {
					if (thumbnail === "") return;
					let node: SnapshotModel | undefined;
					text.split("\n").forEach((line: string) => {
						if (node) {
							node.img =
								thumbnail.split("/").slice(0, -1).join("/") +
								"/" +
								line.split("#xywh=")[0];
							const noArr = line.split("#xywh=")[1].split(",");
							node.location = [
								toInt(noArr[0]),
								toInt(noArr[1]),
								toInt(noArr[2]),
								toInt(noArr[3]),
							];
							node = undefined;
						} else if (line.indexOf("-->") > 0) {
							node = {} as any;
							if (node) {
								snapshots.current.push(node);
								const times = line.split("-->");
								node.startTime = toSecond(times[0]);
								node.endTime = toSecond(times[1]);
							}
						}
					});
				})
				.catch((e) => console.error(e));
	}, [thumbnail]);

	return (
		<GeneralStyleForRange
			className="media-timeLine"
			onMouseEnter={() => {
				changeShowBubble(true);
			}}
			onMouseLeave={() => {
				changeShowBubble(false);
			}}
			onTouchMove={() => {
				changeShowBubble(true);
				clearTimeout(timeOut);
				timeOut = setTimeout(() => {
					changeShowBubble(false);
				}, 2000);
			}}
		>
			<RangeSelect
				max={100}
				min={0}
				step={0.1}
				controllerRef={controllerRef}
				onChangeCallback={rangeSelectChangeVideoTime}
				onRangeMove={(e: any) => {
					setBubble(e);
				}}
				onRangeStart={() => {
					const isPlay = (playStateRef.current = getIsPlay());
					if (isPlay) changePlayPause(false);
				}}
				onRangeEnd={() => {
					if (playStateRef.current) changePlayPause(true);
				}}
			/>

			{thumbnail && (
				<>
					<Bubble ref={snapShotBox} className="bubble">
						<Snapshot
							snapshots={snapshots.current}
							time={hoverValue}
						/>
						<div style={{ marginTop: "5px" }}>
							{formatDuration(hoverValue)}
						</div>
					</Bubble>
					<ThumbCursor ref={snapShotBoxCursor} />
				</>
			)}

			<BufferSize id="buffer-size" />
		</GeneralStyleForRange>
	);
};

export default TimeLine;
