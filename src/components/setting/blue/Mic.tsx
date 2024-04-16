import React, { HTMLAttributes, useEffect, useState } from "react";
import Icon from "../../icons/Icon";
import { MediaPlaylistType } from "../../../@types/UseVideoHlsType.model";
import Dialog from "../../general/Dialog";
import { DialogTitle } from "../../general/DialogStyle";
import {
	SettingItemIcon,
	SettingItemSpan,
	SettingMenuItem,
} from "../red/SettingStyle";
import { CenterBox } from "../../general/FlexCenter";
import { useAudio } from "../../../hooks/useAudio";
import { useVideo } from "../../../hooks/useVideo";

const Mic = ({ onClick }: HTMLAttributes<HTMLElement>) => {
	const [currentAudioTrack, setCurrentAudioTrack] = useState<
		number | undefined
	>();
	const [audioTracks, setAudioTracks] = useState<MediaPlaylistType>();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const loadLevels = () => {
		setCurrentAudioTrack(getAudioTrack());
		setAudioTracks(getAudioTracks() || []);
	};
	const { getAudioTrack, getAudioTracks, changeAudioTrack } = useAudio();
	useVideo({ onLoaded: loadLevels });

	useEffect(() => {
		loadLevels();
	}, []);

	const setAudioTrack = (index: number) => {
		changeAudioTrack(index);
		setCurrentAudioTrack(index);
	};
	return (
		<>
			<Dialog
				onClose={() => {
					setIsOpen(false);
				}}
				isOpen={isOpen}
			>
				<DialogTitle>زبان پخش</DialogTitle>
				{audioTracks?.map((item, index) => (
					<SettingMenuItem
						onClick={() => {
							setAudioTrack(index);
							setIsOpen((pre) => !pre);
						}}
						className={`is-reversed ${
							currentAudioTrack === index ? "active" : ""
						}`}
						key={index + "MicDialog"}
					>
						<CenterBox>
							<SettingItemIcon
								className="reversed-icon"
								style={{
									display:
										currentAudioTrack === index
											? "flex"
											: "none",
								}}
							>
								<Icon isClickable={true} type="checkMark" />
							</SettingItemIcon>
							<SettingItemSpan className="reserved-span">
								{item.name}
							</SettingItemSpan>
						</CenterBox>
					</SettingMenuItem>
				))}
			</Dialog>
			<Icon
				onClick={() => setIsOpen((pre) => !pre)}
				isClickable={true}
				type="mic"
			/>
		</>
	);
};

export default Mic;
