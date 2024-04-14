import { memo, useRef, useState } from "react";
import RangeSelect from "../general/range-select/RangeSelect";
import { VolumeWrapper } from "../toolbar/ToolbarStyle";
import Icon from "../icons/Icon";
import { usePlayerContext } from "../../hooks/usePlayerContext";
import React from "react";
import styled from "@emotion/styled";
import { useVolume } from "../../hooks/useVolume";

type ChangeRangeSelectType = {
	calcInputVal: (e: number, updateParent: boolean) => void;
};
const RangeSelectWrapper = styled.div(
	{
		transition:
			"margin .2s cubic-bezier(0,0,.2,1),width .2s cubic-bezier(0,0,.2,1)",
	},
	({ visible }: { visible: boolean }) => ({
		opacity: visible ? 1 : 0,
		width: visible ? "80px" : "0",
		marginRight: visible ? "22px !important" : "0 !important",
	})
);
const Volume = memo(() => {
	const { changeVolume, changeMute } = useVolume();
	usePlayerContext({
		onChangeVolume: (e) => {
			setVolume(e * 100);
		},
		onChangeMute: (e) => {
			setIsMuted(e);
		},
	});
	const [volume, setVolume] = useState<number>(100);
	const [isMute, setIsMuted] = useState<boolean>(true);
	const [volumeVisibility, setVolumeVisibility] = useState<boolean>(false);
	const controllerRef = useRef<ChangeRangeSelectType>({
		calcInputVal: () => {},
	});

	const mute = () => {
		changeMute(!isMute);
		!isMute
			? controllerRef.current.calcInputVal(0, false)
			: controllerRef.current.calcInputVal(volume, false);
	};

	const changeVol = (e: number) => {
		changeVolume(e / 100);
	};

	const calcVolumeIcon = () => {
		if (volume <= 1 || isMute) {
			return (
				<Icon isClickable={true} type="mute" onClick={() => mute()} />
			);
		} else {
			if (volume >= 66)
				return (
					<Icon
						isClickable={true}
						type="volumeUp"
						onClick={() => mute()}
					/>
				);
			else if (volume < 66 && volume >= 1)
				return (
					<Icon
						isClickable={true}
						type="volumeDown"
						onClick={() => mute()}
					/>
				);
		}
	};
	return (
		<VolumeWrapper
			gap={volumeVisibility}
			onMouseEnter={() => setVolumeVisibility(true)}
			onMouseLeave={() => setVolumeVisibility(false)}
		>
			{calcVolumeIcon()}
			<RangeSelectWrapper visible={volumeVisibility}>
				<RangeSelect
					step={1}
					min={0}
					max={100}
					controllerRef={controllerRef}
					onChangeCallback={changeVol}
				/>
			</RangeSelectWrapper>
		</VolumeWrapper>
	);
});

export default Volume;
