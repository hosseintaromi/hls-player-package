import React, { useState } from "react";
import SettingItem from "./SettingItem";
import { SettingMenu } from "../../general/FlexCenter";
import SettingHeader from "./SettingHeader";
import { useVideo } from "../../../hooks/useVideo";
import Locale from "../../locale/Locale";
import Icon from "../../icons/Icon";
import { pageName, pageDir } from "../../../@types/setting.model";
import { useSpeed } from "../../../hooks/useSpeed";

type settingPlaybackSpeedPropsType = {
	changePage: (newPageName: pageName, dir: pageDir) => void;
	myRef: React.RefObject<HTMLDivElement>;
};

const SettingPlaybackSpeed = ({
	changePage,
	myRef,
}: settingPlaybackSpeedPropsType) => {
	const { getSpeeds, changeSpeed, speed } = useSpeed();
	const setSpeed = (index: number) => {
		changeSpeed(index);
		changePage(pageName.settingList, pageDir.back);
	};

	return (
		<>
			<SettingMenu myRef={myRef}>
				<>
					<SettingHeader
						title={
							<Locale localeKey="setting_menu_change_speed_title" />
						}
						hasBackButton={true}
						hasCustomButton={false}
						changePage={changePage}
						backRoute={pageName.settingList}
					/>
					{getSpeeds()?.map((speedItem, index) => (
						<SettingItem
							key={`speedItemdd${index}`}
							onClick={() => setSpeed(index)}
							startIcon={
								speedItem.value === speed?.value ? (
									<Icon isClickable={true} type="checkMark" />
								) : (
									<></>
								)
							}
							text={speedItem.key}
						/>
					))}
				</>
			</SettingMenu>
		</>
	);
};

export default SettingPlaybackSpeed;
