import React, { useState } from "react";
import {
	SettingItemWrapper,
	SettingLeftSection,
	SettingRightSection,
	TimeCounter,
	TimeDivider,
	ToolbarWrapper,
} from "../toolbar/ToolbarStyle";
import { ToolBarPlayIcon } from "../player/VideoPlayerStyle";
import Play from "../tools/Play";
import Time from "../tools/Time";
import PictureInPicture from "../tools/PictureInPicture";
import Fullscreen from "../tools/Fullscreen";
import MediaTimeLine from "../timeline/MediaTimeLine";
import Speed from "../setting/blue/Speed";
import Subtitle from "../setting/blue/SubTitle";
import Mic from "../setting/blue/Mic";
import Quality from "../setting/blue/Quality";
import Mute from "../tools/Mute";
import { usePlayerEvents } from "../../hooks/usePlayerEvents";
import SensitiveArea from "../player/SensitiveArea";
import Skip from "../tools/ads/Skip";
import { useLevel } from "../../hooks/useLevel";
import { useSubTitle } from "../../hooks";

const BlueToolbar = ({ isFaded }: { isFaded: boolean }) => {
	const [isShowQ, setIsShowQ] = useState<any>();
	const [isShowS, setIsShowS] = useState<any>();
	const [isShowA, setIsShowA] = useState<any>();
	const loadLevels = () => {
		setIsShowQ(getLevels() !== undefined);
		setIsShowS(getSubtitle() !== undefined);
		setIsShowA(getAudioTracks() !== undefined);
	};
	const { getLevels } = useLevel();
	const { getSubtitle } = useSubTitle();
	const { getAudioTracks } = usePlayerEvents({
		onLoaded: loadLevels,
	});

	return (
		<SensitiveArea>
			<Skip />
			<ToolbarWrapper isFaded={isFaded}>
				<TimeCounter className="blue-counter">
					<Time type="Current" />
					<Time type="Total" />
				</TimeCounter>
				<MediaTimeLine />
				<SettingItemWrapper className="blue-setting-wrapper">
					<SettingLeftSection>
						<ToolBarPlayIcon>
							<Play />
						</ToolBarPlayIcon>
						<Mute />
					</SettingLeftSection>
					<SettingRightSection>
						{isShowA && <Mic />}
						{isShowS && <Subtitle />}
						<Speed />
						{isShowQ && <Quality />}

						<PictureInPicture />
						<Fullscreen />
					</SettingRightSection>
				</SettingItemWrapper>
			</ToolbarWrapper>
		</SensitiveArea>
	);
};

export default BlueToolbar;
