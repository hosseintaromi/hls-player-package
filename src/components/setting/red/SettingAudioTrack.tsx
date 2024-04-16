import React, { useEffect, useState } from "react";
import SettingItem from "./SettingItem";
import { SettingMenu } from "../../general/FlexCenter";
import SettingHeader from "./SettingHeader";
import { MediaPlaylistType } from "../../../@types/UseVideoHlsType.model";
import Locale from "../../locale/Locale";
import Icon from "../../icons/Icon";
import { pageDir, pageName } from "../../../@types/setting.model";
import { useAudio } from "../../../hooks/useAudio";
import { useVideo } from "../../../hooks/useVideo";

type SettingAudioTrackType = {
	changePage: (newPageName: pageName, dir: pageDir) => void;
	myRef: React.RefObject<HTMLDivElement>;
};

const SettingAudioTrack = ({ changePage, myRef }: SettingAudioTrackType) => {
	const [currentAudioTrack, setCurrentAudioTrack] = useState<
		number | undefined
	>();
	const [audioTracks, setAudioTracks] = useState<MediaPlaylistType>();
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
		changePage(pageName.settingList, pageDir.back);
	};

	const audioTrackListGenerator = () => {
		return audioTracks ? (
			audioTracks.map((item, index) => (
				<SettingItem
					key={`audioTrackListGenerator${index}`}
					onClick={() => setAudioTrack(index)}
					startIcon={
						currentAudioTrack === index ? (
							<Icon type="checkMark" isClickable={true} />
						) : null
					}
					text={item.name}
				/>
			))
		) : (
			<></>
		);
	};
	return (
		<SettingMenu myRef={myRef}>
			<SettingHeader
				title={
					<Locale localeKey="setting_menu_change_audio_track_title" />
				}
				hasBackButton={true}
				hasCustomButton={false}
				changePage={changePage}
				backRoute={pageName.settingList}
			/>
			<div>{audioTrackListGenerator()}</div>
		</SettingMenu>
	);
};

export default SettingAudioTrack;
