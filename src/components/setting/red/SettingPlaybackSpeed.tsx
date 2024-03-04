import React, { useState } from 'react'
import SettingItem from './SettingItem';
import { SettingMenu } from '../../general/FlexCenter';
import SettingHeader from './SettingHeader';
import { usePlayerContext } from '../../../hooks/usePlayerContext';
import Locale from '../../locale/Locale';
import Icon from '../../icons/Icon';
import { pageName, pageDir } from '../../../@types/setting.model';

type settingPlaybackSpeedPropsType = {
    changePage: (newPageName: pageName, dir: pageDir) => void,
    myRef: React.RefObject<HTMLDivElement>
}

const SettingPlaybackSpeed = ({ changePage, myRef }: settingPlaybackSpeedPropsType) => {

    const { getSpeeds, changeSpeed } = usePlayerContext()
    const [indexSpeed, setIndexSpeed] = useState(1)
    const setSpeed = (index: number) => {
        changeSpeed(index)
        setIndexSpeed(index)
        changePage(pageName.settingList, pageDir.back)
    }

    return (
        <>
            <SettingMenu myRef={myRef}>
                <>
                    <SettingHeader
                        title={<Locale localeKey="setting_menu_change_speed_title" />}
                        hasBackButton={true}
                        hasCustomButton={false}
                        changePage={changePage}
                        backRoute={pageName.settingList}
                    />
                    {getSpeeds().map((speed, index) =>
                        <SettingItem
                            key={`speedItemdd${index}`} onClick={() => setSpeed(index)}
                            startIcon={indexSpeed === index ? <Icon isClickable={true} type='checkMark' /> : <></>}
                            text={speed.key} />
                    )}
                </>
            </SettingMenu>
        </>
    )
}

export default SettingPlaybackSpeed