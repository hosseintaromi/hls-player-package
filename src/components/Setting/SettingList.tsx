import React from 'react'
import SettingItem from './SettingItem';
import PlaybackSpeed from '../assets/Icons/PlaybackSpeed';
import { IconWrapper, SettingMenu } from '../General/FlexCenter';
import ArrowRight from '../assets/Icons/ArrowRight';
import ChangeQuality from '../assets/Icons/ChangeQuality';
import { pageDir, pageName } from './Setting';
import Subtitle from '../assets/Icons/Subtitle';
import AudioIcon from '../assets/Icons/AudioIcon';

type SettingListType = {
    changePage: (newPageName: pageName, dir: pageDir) => void,
    myRef: React.RefObject<HTMLDivElement>
    currentLevel: string | number
}

const SettingList = ({ changePage, myRef, currentLevel }: SettingListType) => {
    return (
        <SettingMenu myRef={myRef}>
            <div onClick={() => changePage(pageName.playbackSpeed, pageDir.forward)}>
                <SettingItem startIcon={<PlaybackSpeed />} content='Playback speed' >
                    <span>
                        normal
                    </span>
                    <IconWrapper>
                        <ArrowRight />
                    </IconWrapper>
                </SettingItem>
            </div>
            <div onClick={() => changePage(pageName.quality, pageDir.forward)}>
                <SettingItem startIcon={<ChangeQuality />} content='ChangeQuality'>
                    <span>
                        {currentLevel}
                    </span>
                    <IconWrapper>
                        <ArrowRight />
                    </IconWrapper>
                </SettingItem>
            </div>
            <div onClick={() => changePage(pageName.quality, pageDir.forward)}>
                <SettingItem startIcon={<Subtitle />} content='Subtitles / cc'>
                    <span>
                        English
                    </span>
                    <IconWrapper>
                        <ArrowRight />
                    </IconWrapper>
                </SettingItem>
            </div>
            <div onClick={() => changePage(pageName.quality, pageDir.forward)}>
                <SettingItem startIcon={<AudioIcon />} content='Audio Track'>
                    <span>
                        English
                    </span>
                    <IconWrapper>
                        <ArrowRight />
                    </IconWrapper>
                </SettingItem>
            </div>
        </SettingMenu>
    )
}

export default SettingList