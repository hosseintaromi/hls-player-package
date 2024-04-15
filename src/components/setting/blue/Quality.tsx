import React, { useEffect, useState } from "react";
import Icon from "../../icons/Icon";
import { usePlayerEvents } from "../../../hooks/usePlayerEvents";
import { LevelType } from "../../../@types/UseVideoHlsType.model";
import Dialog from "../../general/Dialog";
import { DialogTitle } from "../../general/DialogStyle";
import Locale from "../../locale/Locale";
import {
	SettingItemIcon,
	SettingItemSpan,
	SettingMenuItem,
} from "../red/SettingStyle";
import { CenterBox } from "../../general/FlexCenter";
import { IconButton } from "../../toolbar/ToolbarStyle";
import Badge from "../../general/Badge";
import { useLevel } from "../../../hooks/useLevel";

const Quality = () => {
	const [levels, setLevels] = useState<LevelType>();
	const [currentLevel, setCurrentLevel] = useState<number>();
	const loadLevels = () => {
		setLevels(getLevels());
		const curlvl = getCurrentLevel().isAuto
			? -1
			: getCurrentLevel().currentLevel;
		setCurrentLevel(curlvl === undefined ? -1 : curlvl);
	};
	const { getLevels, changeLevel, getCurrentLevel } = useLevel();

	usePlayerEvents({
		onLoaded: loadLevels,
	});

	useEffect(() => {
		loadLevels();
	}, []);

	const setQuality = (index: number) => {
		changeLevel(index);
		setCurrentLevel(index);
	};

	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<Dialog
				onClose={() => {
					setIsOpen(false);
				}}
				isOpen={isOpen}
			>
				<DialogTitle>کیفیت پخش</DialogTitle>
				{levels?.map((item, index) => (
					<SettingMenuItem
						onClick={() => {
							setQuality(index);
							setIsOpen((pre) => !pre);
						}}
						className={`is-reversed ${
							currentLevel === index ? "active" : ""
						}`}
						key={index + "qualityDialog"}
					>
						<CenterBox>
							<SettingItemIcon
								className="reversed-icon"
								style={{
									display:
										currentLevel === index
											? "flex"
											: "none",
								}}
							>
								<Icon isClickable={true} type="checkMark" />
							</SettingItemIcon>
							<SettingItemSpan className="reserved-span">
								{item.height}
							</SettingItemSpan>
						</CenterBox>
					</SettingMenuItem>
				))}
				<SettingMenuItem
					onClick={() => {
						setQuality(-1);
						setIsOpen((pre) => !pre);
					}}
					className={`is-reversed ${
						currentLevel === -1 ? "active" : ""
					}`}
					key={-1 + "speedDialog"}
				>
					<CenterBox>
						<SettingItemIcon
							className="reversed-icon"
							style={{
								display: currentLevel === -1 ? "flex" : "none",
							}}
						>
							<Icon isClickable={true} type="checkMark" />
						</SettingItemIcon>
						<SettingItemSpan className="reserved-span">
							<Locale localeKey="setting_menu_quality_list_item_auto" />
						</SettingItemSpan>
					</CenterBox>
				</SettingMenuItem>
			</Dialog>
			<IconButton onClick={() => setIsOpen((pre) => !pre)}>
				<Icon isClickable={true} type="setting" />
				{/* <Badge colors='danger' isFixed>
                    12.2
                </Badge> */}
			</IconButton>
		</>
	);
};

export default Quality;
