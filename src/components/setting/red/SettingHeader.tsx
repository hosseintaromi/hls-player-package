import { ReactNode } from 'react'
import { FlexCenter } from '../../general/FlexCenter'
import Icon from '../../icons/Icon'
import React from 'react'
import { SettingHeaderTitle, SettingHeaderWrapper } from './SettingStyle'
import { pageName, pageDir } from '../../../@types/setting.model'

type settingHeaderPropsType = {
    title: ReactNode,
    hasCustomButton: boolean,
    hasBackButton: boolean,
    changePage: (newPageName: pageName, dir: pageDir) => void,
    backRoute: pageName
}

const SettingHeader = ({ title, hasCustomButton, hasBackButton, changePage }: settingHeaderPropsType) => {
    return (
        <SettingHeaderWrapper>
            {hasBackButton && <SettingHeaderTitle onClick={() => changePage(pageName.settingList, pageDir.back)}>
                <Icon isClickable={true} type="arrow" />
                {title}
            </SettingHeaderTitle>
            }
            {hasCustomButton ?
                <FlexCenter>
                    <span>custom</span>
                </FlexCenter>
                : <></>
            }
        </SettingHeaderWrapper>
    )
}

export default SettingHeader