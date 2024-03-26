import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react'


export const CenterBox = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const FlexCenter = ({ children }: HTMLAttributes<HTMLElement> ) => {
    return (
        <CenterBox>
            {children}
        </CenterBox>
    )
}



const SettingMenuWrapper = styled.div({
    transition: 'all 0.3s ease',
    opacity: '0',
    width: '100%',
    bottom: '0',
    display: 'none',
});
export const SettingMenu = ({ children, myRef }: { children: JSX.Element[] | JSX.Element, myRef: React.RefObject<HTMLDivElement> }) => {
    return (
        <SettingMenuWrapper ref={myRef} id='settingMenu'>
            {children}
        </SettingMenuWrapper>
    )
} 