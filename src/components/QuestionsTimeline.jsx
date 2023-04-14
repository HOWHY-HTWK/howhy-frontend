import React, { useState, useEffect } from 'react'
import * as utils from '../utils.js'
import styles from './css/QuestionsTimeline.module.css'

export default function QuestionsTimeline({ videoData, jumpToTime, duration }) {
    // const timecodes = utils.makeTimecodesList(videoData.data);
    const orderedVideoData = videoData.data.sort((first, last) => first.timecode - last.timecode)
    const questions = orderedVideoData.map(question => {
        let percent = question.timecode/duration*100
        let distance = percent+'%'
        return (
            <div style={{ left: distance}}
                className={styles.questionDot}
                key={question.id}
                onClick={() => jumpToTime(question.timecode)}>
                ?
                <span className={styles.timecode}>
                    {utils.getTimeInReadable(question.timecode)}
                </span>
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
