import React, { useState, useEffect } from 'react'
import './css/questionsTimeline.css'
import * as utils from '../utils.js'


export default function QuestionsTimeline({ videoData, jumpToTime }) {
    const timecodes = utils.makeTimecodesList(videoData.data);
    const questions = timecodes.map(timecode => <div id="timecode" key={timecode} onClick={() => jumpToTime(timecode)}><div>{timecode}</div></div>);

    return (
            <div id="timelineWwrapper">{questions}</div>
    )
}
