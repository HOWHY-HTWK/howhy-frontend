import React, { useState, useEffect } from 'react'
import * as utils from '../utils.js'
import styles from './css/QuestionsTimeline.module.css'

export default function QuestionsTimeline({ videoData, jumpToTime, duration }) {

    const questions = videoData.data.map(question => {
        let percent = question.timecode / duration * 100
        let distance = percent + '%'
        return (
            <div style={{ left: distance }}
                className={styles.questionDot}
                key={question.id}
                onClick={() => jumpToTime(question.timecode)}>
                ?
                <div className={styles.timecode}>
                    {utils.getTimeInReadable(question.timecode)}
                </div>
            </div>
        )
    }
    );

    return (
        <div className={`center`}>
            <div className={styles.timelineWwrapper}>
                <div className={styles.stripe}></div>
                {questions}</div>
        </div>
    )
}
