import React from "react"
import * as utils from "../../../../utils/utils"
import styles from "./QuestionsTimeline.module.css"

/**
 * Shows all the questions on a timeline according to their timecodes and the duration of the video.
 *  When a question is pressed the jumptoQuestion method is called with the timecode of the question.
 *
 * @param {list} questionTimecodes
 * @param {func} jumpToQuestion
 * @param {int} duration
 *
 * @returns
 */
export default function QuestionsTimeline({
    className,
    questionTimecodes,
    jumpToQuestion,
    duration
}) {
    const questions = questionTimecodes.map((question) => {
        let percent = (question.timecode / duration) * 100
        let distance = percent + "%"
        return (
            <div
                style={{ left: distance }}
                className={[
                    className,
                    styles.questionDot,
                    getBackground(question.correct)
                ].join(" ")}
                key={question.id}
                onClick={() => jumpToQuestion(question.timecode, question.id)}
            >
                {getSymbol(question.correct)}
                <div className={styles.timecode}>
                    {utils.getTimeInReadable(question.timecode)}
                </div>
            </div>
        )
    })

    function getBackground(correct) {
        if (correct == null) {
            return null
        }
        if (correct) {
            return styles.correct
        } else {
            return styles.false
        }
    }

    function getSymbol(correct) {
        if (correct == null) {
            return "?"
        }
        if (correct) {
            return "✓"
        } else {
            return "X"
        }
    }

    return (
        <div className={`center`}>
            <div className={styles.timelineWwrapper}>
                <div className={styles.stripe}></div>
                {questions}
            </div>
        </div>
    )
}
