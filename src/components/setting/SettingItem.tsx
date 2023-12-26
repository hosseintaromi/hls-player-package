import React, { HTMLAttributes, ReactNode } from 'react'
import { CenterBox, FlexCenter } from '../general/FlexCenter'
import { SettingItemIcon, SettingItemMore, SettingItemSpan, SettingMenuItem } from './SettingStyle'

const SettingCenter = ({ children }: HTMLAttributes<HTMLElement>) => {
    return (
        <CenterBox style={{ position: "relative" }}>
            {children}
        </CenterBox>
    )
}

type settingItemProps = {
    startIcon: JSX.Element | null,
    text?: ReactNode,
} & HTMLAttributes<HTMLElement>
const SettingItem = ({ children, startIcon, text, onClick, className }: settingItemProps
) => {
    return (
        <SettingMenuItem className={className} onClick={onClick}>
            <SettingCenter>
                <SettingItemIcon>
                    {startIcon ? startIcon : <></>}
                </SettingItemIcon>
                <SettingItemSpan>
                    {text}
                </SettingItemSpan>
            </SettingCenter>
            {
                children &&
                <SettingItemMore>
                    <FlexCenter>
                        {children}
                    </FlexCenter>
                </SettingItemMore>
            }
        </SettingMenuItem>
    )
}

export default SettingItem