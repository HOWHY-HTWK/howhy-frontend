import React from 'react'
import './css/questionList.css'


export default function QuestionList({ videoData, editQuestion, deleteQuestion }) {
    const questions = videoData.data.map(question => getListElement(question));
    // console.log(questions)

    return (
        <div>
            <p>Existierende Fragen:</p>
            <div>{questions}</div>
        </div>

    )

    function getListElement(question) {
        return (
            <div className="listElement" key={question.timecode} onClick={() => null}>
                <div className='text'>{question.question}</div>
                <div className='rightWrapper'>
                    <div className="questionButton deleteButton" onClick={() => deleteQuestion(question)}>Löschen</div>
                    <div className="questionButton edit" onClick={() => editQuestion(question)}>Bearbeiten</div>
                </div>
            </div>
        )
    }
}
