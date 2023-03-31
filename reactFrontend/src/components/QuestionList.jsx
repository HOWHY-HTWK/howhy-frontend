import React from 'react'
import './css/questionList.css'
import * as utils from '../utils.js'


export default function QuestionList({ videoData, editQuestion, deleteQuestion }) {
    const questions = videoData.data.map(question => getListElement(question));

    return (
        <>
            <p>Existierende Fragen:</p>
            <div>{questions}</div>
        </>
    )

    function getListElement(question) {
        return (
            <div className="listElement" key={question.id} onClick={() => null}>
                <div className='questionElements questionText text'>{question.question}
                    <div id="bottomWrapper">
                        <div id="timecodeinlist">{utils.getTimeInReadable(question.timecode)}</div>
                        <div className='rightWrapper'>
                            <div className="questionButton deleteButton" onClick={() => deleteQuestion(question)}>Löschen</div>
                            <div className="questionButton edit" onClick={() => editQuestion(question)}>Bearbeiten</div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
