import React, { useState } from 'react'
import Icon from '../icons/Icon'
import { usePlayerContext } from '../../hooks/usePlayerContext'

const Mute = () => {
    const [volume, setVolume] = useState<number>(100);
    const [isMute, setIsMuted] = useState<boolean>(true)
    const calcVolumeIcon = () => {
        if (volume <= 1 || isMute) {
            return (
                <Icon isClickable={true} type='mute' onClick={() => mute()} />
            )
        } else {
            if (volume >= 66)
                return (
                    <Icon isClickable={true} type='volumeUp' onClick={() => mute()} />
                )
            else
                return (
                    <Icon isClickable={true} type='volumeDown' onClick={() => mute()} />
                )
        }

    }
    const mute = () => {
        changeMute(!isMute)

    }
    const { changeVolume, changeMute } = usePlayerContext({
        onChangeVolume: (e) => {
            setVolume(e * 100)
        },
        onChangeMute: (e) => {
            setIsMuted(e)
        }
    })
    return (
        calcVolumeIcon()
    )
}

export default Mute