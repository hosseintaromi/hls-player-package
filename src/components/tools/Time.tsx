import React, { useEffect, useMemo, useState } from 'react'
import { usePlayerContext } from '../../hooks/usePlayerContext';
import { OnUpdateTimeType } from '../../@types/player.model';
import { calculatePlayerTime } from '../../utils/global-filter';
import { TimeCounter } from '../toolbar/ToolbarStyle';

const Time = ({ type }: { type: 'Current' | 'Total' | 'Remain' }) => {

    const [time, setTime] = useState<string>("00:00:00");

    const { getDuration } = usePlayerContext({
        onReady: () => {
            if (type === 'Total')
                setTime(calculatePlayerTime(getDuration() || 0))
        },
        onUpdateTime: (e: OnUpdateTimeType) => {
            switch (type) {
                case "Current":
                    setTime(calculatePlayerTime(e.time))
                    break;
                case "Remain":
                    setTime(calculatePlayerTime(e.duration - e.time))
                    break;
            }
        },
    })

    return (
        <TimeCounter>{time}</TimeCounter>
    )
}

export default Time