import React, { useState, useEffect } from 'react'
import * as utils from '../utils.js'
import styles from './css/QuestionsTimeline.module.css'

export default function QuestionsTimeline({ questionTimecodes, jumpToTime, duration }) {

    console.log(questionTimecodes);
    const questions = questionTimecodes.map(question => {
        let percent = question.timecode / duration * 100
        let distance = percent + '%'
        return (
            <div style={{ left: distance }}
                className={[styles.questionDot, getBackground(question.correct)].join(' ')} 
                key={question.id}
                onClick={() => jumpToTime(question.timecode)}>
                {getSymbol(question.correct)}
                <div className={styles.timecode}>
                    {utils.getTimeInReadable(question.timecode)}
                </div>
            </div>
        )
    });

    return (
        <div className={`center`}>
            <div className={styles.timelineWwrapper}>
                <div className={styles.stripe}></div>
                {questions}</div>
        </div>
    )
function getBackground(correct){
    if(correct == null){
        return null;
    } 
    if(correct){
        return styles.correct
    } else {
        return styles.false
    }
}

function getSymbol(correct){
    if(correct == null){
        return '?';
    } 
    if(correct){
        return '✓'
    } else {
        return 'X'
    }
}

}
