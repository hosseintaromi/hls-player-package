import React, { ReactNode, useEffect } from 'react'
import {
    ModalContent,
    ModalOverlay,
    ModalWrapper
}
    from './DialogStyle';
import { createPortal } from 'react-dom';
import useContextEvents from '../../hooks/useContextEvents';
import { PlayerEventsType } from '../../@types/player.model';
import VideoPlayerContext from '../../contexts/VideoPlayerContext';

type DialogPropsType = {
    children: ReactNode,
    isOpen: boolean,
    onClose: () => void
}

const Dialog = ({ children, isOpen, onClose }: DialogPropsType) => {
    const { call } =
        useContextEvents<PlayerEventsType>(VideoPlayerContext);
    useEffect(() => {
        call.onChangeSetting?.(isOpen)
    }, [isOpen])
    return (<>
        {createPortal(
            isOpen && <ModalOverlay onClick={onClose}>
                <ModalWrapper onClick={(e: any) => e.stopPropagation()} id='setting-menu'>
                    <ModalContent>
                        {children}
                    </ModalContent>
                </ModalWrapper>
            </ModalOverlay>,
            document.body
        )}
    </>
    )
}

export default Dialog