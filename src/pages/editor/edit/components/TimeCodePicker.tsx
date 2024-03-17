import React from "react"
import styles from "./TimeCodePicker.module.css"
import { getHoursMinutesSeconds } from "../../../../utils/utils"

/**
 * Displays drop-down menus to Pick a Timecode
 *
 * @param {Int} duration
 * @param {Int} time
 * @param {Functino} setTimeCode
 * @returns
 */
export default function TimeCodePicker({ duration, time, setTimeCode }) {
    const timecode = getHoursMinutesSeconds(time)

    function getTotalSeconds(timeObject) {
        return (
            timeObject.hours * 3600 +
            timeObject.minutes * 60 +
            timeObject.seconds
        )
    }

    function changeTimeCode(newTime) {
        if (getTotalSeconds(newTime) <= duration) {
            setTimeCode(getTotalSeconds(newTime))
        } else {
            alert("Dieser Timecode liegt nicht im Video")
        }
    }

    function getOptions(length) {
        let array = Array.from({ length: length })
        return array.map((_, index) => (
            <option key={index} value={index}>
                {index}
            </option>
        ))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.box}>
                <label>
                    Zeitpunkt setzen:&nbsp;
                    {getHoursMinutesSeconds(duration).hours != 0 ? (
                        <>
                            <select
                                value={timecode.hours}
                                onChange={(e) =>
                                    changeTimeCode({
                                        ...timecode,
                                        hours: parseInt(e.target.value)
                                    })
                                }
                            >
                                {getOptions(24)}
                            </select>
                            h
                        </>
                    ) : null}
                </label>
                <label>
                    <select
                        value={timecode.minutes}
                        onChange={(e) =>
                            changeTimeCode({
                                ...timecode,
                                minutes: parseInt(e.target.value)
                            })
                        }
                    >
                        {getOptions(60)}
                    </select>
                    m
                </label>
                <label>
                    <select
                        value={timecode.seconds}
                        onChange={(e) =>
                            changeTimeCode({
                                ...timecode,
                                seconds: parseInt(e.target.value)
                            })
                        }
                    >
                        {getOptions(60)}
                    </select>
                    s
                </label>
            </div>
        </div>
    )
}
