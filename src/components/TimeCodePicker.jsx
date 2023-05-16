import React, { useEffect, useState } from 'react'
import styles from './css/TimeCodePicker.module.css'
import * as utils from '../utils.js'

export default function TimeCodePicker({ duration, time, setTimeCode }) {
    const timeHMS = utils.getHoursMinutesSeconds(time)

    const [timecode, setLocalTimeCode] = useState(timeHMS);

    useEffect(() => {
        const totalSeconds = getTotalSeconds(timecode);
        setTimeCode(totalSeconds)
    }, [timecode])

    function getTotalSeconds(timeObject) {
        return timeObject.hours * 3600 + timeObject.minutes * 60 + timeObject.seconds
    }

    function changeTimeCode(newTime) {
        if (getTotalSeconds(newTime) <= duration) {
            setLocalTimeCode(newTime)
        } else {
            alert("Dieser Timecode liegt nicht im Video")
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.box}>
                <label>
                    Zeitpunkt der Frage:&nbsp;
                    <select value={timecode.hours} onChange={e => changeTimeCode({ ...timecode, hours: parseInt(e.target.value) })}>
                        {Array.from({ length: 24 }).map((_, index) => (
                            <option key={index} value={index}>
                                {index}
                            </option>
                        ))}
                    </select>
                    h
                </label>
                <label>
                    <select value={timecode.minutes} onChange={e => changeTimeCode({ ...timecode, minutes: parseInt(e.target.value) })}>
                        {Array.from({ length: 60 }).map((_, index) => (
                            <option key={index} value={index}>
                                {index}
                            </option>
                        ))}
                    </select>
                    m
                </label>
                <label>
                    <select value={timecode.seconds} onChange={e => changeTimeCode({ ...timecode, seconds: parseInt(e.target.value) })}>
                        {Array.from({ length: 60 }).map((_, index) => (
                            <option key={index} value={index}>
                                {index}
                            </option>
                        ))}
                    </select>
                    s
                </label>
            </div>
        </div>
    );
}
