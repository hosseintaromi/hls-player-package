import React, { ReactNode, useEffect, useState } from "react";
import SettingItem from "./SettingItem";
import { SettingMenu } from "../../general/FlexCenter";
import { usePlayerEvents } from "../../../hooks/usePlayerEvents";
import Locale from "../../locale/Locale";
import { useVideo } from "../../../hooks/useVideo";
import {
	LevelType,
	MediaPlaylistType,
} from "../../../@types/UseVideoHlsType.model";
import Icon from "../../icons/Icon";
import { SettingItemArrowSpan } from "./SettingStyle";
import { pageName, pageDir } from "../../../@types/setting.model";
import { useSpeed } from "../../../hooks/useSpeed";
import { useLevel } from "../../../hooks/useLevel";

type SettingListType = {
	changePage: (newPageName: pageName, dir: pageDir) => void;
	myRef: React.RefObject<HTMLDivElement>;
	currentPage?: HTMLDivElement | null | undefined;
};

const SettingList = ({ changePage, myRef, currentPage }: SettingListType) => {
	const [currentLevel, setCurrentLevel] = useState<number>(-1);
	const [currentLevels, setCurrentLevels] = useState<LevelType | undefined>();

	const [currentSubtitle, setCurrentSubtitle] = useState<
		string | ReactNode
	>();
	const [subtitles, setSubtitles] = useState<MediaPlaylistType | undefined>();

	const [audioTracks, setAudioTracks] = useState<
		MediaPlaylistType | undefined
	>();
	const [currentAudioTrack, setCurrentAudioTrack] = useState<
		number | ReactNode
	>();

	const loadLevels = () => {
		const curlvl = getCurrentLevel().isAuto
			? -1
			: getCurrentLevel().currentLevel;
		setCurrentLevel(curlvl === undefined ? -1 : curlvl);

		const curSub = getCurrentSubtitle();
		setSubtitles(getSubtitle());
		if (curSub)
			setCurrentSubtitle(
				curSub === -1 ? (
					<Locale localeKey="setting_menu_subtitle_off" />
				) : (
					subtitles?.[curSub].name
				)
			);

		setAudioTracks(getAudioTracks());

		const track = getAudioTrack();
		if (track) setCurrentAudioTrack(audioTracks?.[track].name);

		setCurrentLevels(getLevels());
	};
	const { speed } = useSpeed();

	const { getCurrentLevel, getLevels } = useLevel();

	const { getAudioTrack, getCurrentSubtitle, getSubtitle, getAudioTracks } =
		usePlayerEvents({ onLoaded: loadLevels });

	useEffect(() => {
		loadLevels();
	}, [currentPage]);

	return (
		<SettingMenu myRef={myRef}>
			<div
				onClick={() => {
					loadLevels();
					changePage(pageName.playbackSpeed, pageDir.forward);
				}}
			>
				<SettingItem
					startIcon={<Icon isClickable={true} type="speed" />}
					text={
						<Locale localeKey="setting_menu_change_speed_title" />
					}
				>
					<SettingItemArrowSpan>{speed?.key}</SettingItemArrowSpan>
					<Icon isClickable={true} type="arrow" />
				</SettingItem>
			</div>
			<div
				onClick={() => {
					loadLevels();
					changePage(pageName.quality, pageDir.forward);
				}}
			>
				<SettingItem
					startIcon={<Icon isClickable={true} type="quality" />}
					text={
						<Locale localeKey="setting_menu_change_quality_title" />
					}
				>
					<SettingItemArrowSpan>
						{currentLevel === -1 ? (
							<Locale localeKey="setting_menu_quality_active_list" />
						) : (
							currentLevels?.[currentLevel]?.height
						)}
					</SettingItemArrowSpan>
					<Icon isClickable={true} type="arrow" />
				</SettingItem>
			</div>
			<div
				onClick={() => {
					loadLevels();
					changePage(pageName.subtitle, pageDir.forward);
				}}
			>
				<SettingItem
					startIcon={<Icon isClickable={true} type="subtitle" />}
					text={<Locale localeKey="setting_menu_change_subtitle" />}
				>
					<SettingItemArrowSpan>
						{currentSubtitle}
					</SettingItemArrowSpan>
					<Icon isClickable={true} type="arrow" />
				</SettingItem>
			</div>
			<div
				onClick={() => {
					loadLevels();
					changePage(pageName.audioTrack, pageDir.forward);
				}}
			>
				<SettingItem
					startIcon={<Icon isClickable={true} type="audioTrack" />}
					text={
						<Locale localeKey="setting_menu_change_audio_track_title" />
					}
				>
					<SettingItemArrowSpan>
						{currentAudioTrack}
					</SettingItemArrowSpan>
					<Icon isClickable={true} type="arrow" />
				</SettingItem>
			</div>
		</SettingMenu>
	);
};

export default SettingList;
