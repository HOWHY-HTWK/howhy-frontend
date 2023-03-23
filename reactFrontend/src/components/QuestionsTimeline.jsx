import React from 'react'
import './questionsTimeline.css'

export default function QuestionsTimeline({ timecodes, setTime }) {
    const questions = timecodes.map(timecode => <div id="timecode" key={timecode} onClick={() => setTime(timecode)}><div>{timecode}</div></div>);

    return (
        <>
            {/* <button onClick={() => setTime(3)}>3</button> */}
            <div id="timelineWwrapper">{questions}</div>
        </>
    )
}
