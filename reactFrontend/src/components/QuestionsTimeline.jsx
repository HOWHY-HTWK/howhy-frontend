import React, { useState, useEffect } from 'react'
import './css/questionsTimeline.css'

export default function QuestionsTimeline({ timecodes, jumpToTime }) {
    const questions = timecodes.map(timecode => <div id="timecode" key={timecode} onClick={() => jumpToTime(timecode)}><div>{timecode}</div></div>);

    return (
        <>
            {/* <button onClick={() => setTime(3)}>3</button> */}
            <div id="timelineWwrapper">{questions}</div>
        </>
    )
}
