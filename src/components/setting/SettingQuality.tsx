import React, { useEffect, useState } from 'react'
import SettingItem from './SettingItem';
import { SettingMenu } from '../general/FlexCenter';
import { pageDir, pageName } from './Setting';
import SettingHeader from './SettingHeader';
import CheckMark from '../icons/icon-list/CheckMark';
import { useVideo } from '../../hooks/useVideo';
import { LevelType } from '../../@types/UseVideoHlsType.model';
import Locale from '../locale/Locale';

type SettingQualityType = {
    changePage: (newPageName: pageName, dir: pageDir) => void,
    myRef: React.RefObject<HTMLDivElement>,
}

const SettingQuality = ({ changePage, myRef }: SettingQualityType) => {
    const [levels, setLevels] = useState<LevelType>()
    const [currentLevel, setCurrentLevel] = useState<number>()
    const loadLevels = () => {
        setLevels(getLevels())
        const curlvl = getCurrentLevel().isAuto ? -1 : getCurrentLevel().currentLevel
        setCurrentLevel(curlvl === undefined ? -1 : curlvl)
    }
    const { getLevels, changeLevel, getCurrentLevel } = useVideo({ onLoaded: loadLevels })
    useEffect(() => {
        loadLevels()
    }, [])

    const setQuality = (index: number) => {
        changeLevel(index)
        setCurrentLevel(index)
        changePage(pageName.settingList, pageDir.back)
    }

    const qualityListGenerator = () => {
        return levels ? levels.map((item, index) =>
            <SettingItem
                key={index}
                onClick={() => setQuality(index)}
                startIcon={currentLevel === index ? < CheckMark /> : null}
                content={item.height}
            />
        ) : <></>
    }

    return (
        <SettingMenu myRef={myRef}>
            <SettingHeader
                title={<Locale localeKey="setting_menu_change_quality_title" />}
                hasBackButton={true}
                hasCustomButton={false}
                changePage={changePage}
                backRoute={pageName.settingList}
            />
            <>
                <SettingItem
                    onClick={() => setQuality(-1)}
                    startIcon={currentLevel === -1 ? < CheckMark /> : null}
                    content={<Locale localeKey="setting_menu_quality_list_item_auto" />}
                />
                {qualityListGenerator()}
            </>

        </SettingMenu>
    )
}

export default SettingQuality