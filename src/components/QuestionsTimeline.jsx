import React, { useState, useEffect } from 'react'
import './css/questionsTimeline.css'
import * as utils from '../utils.js'

export default function QuestionsTimeline({ videoData, jumpToTime }) {
    // const timecodes = utils.makeTimecodesList(videoData.data);
    const questions = videoData.data.map(question => <div id="timecode" key={question.id} onClick={() => jumpToTime(question.timecode)}><div>{utils.getTimeInReadable(question.timecode)}</div></div>);

    return (
            <div id="timelineWwrapper">{questions}</div>
    )
}
