import React from 'react'
import styles from './css/QuestionList.module.css'
import * as utils from '../utils.js'


export default function QuestionList({questions , editQuestion, deleteQuestion }) {

    const orderedQuestions = questions.sort((first, last) => first.timecode - last.timecode)
    const listElements = orderedQuestions.map(question => getListElement(question));

    return (
        <>
            <h3>Existierende Fragen:</h3>
            <div>{listElements}</div>
        </>
    )

    function getListElement(question) {
        return (
            <div className={`listElement`} key={question.id} onClick={() => null}>
                <div className={''}>{question.questionText}
                    <div className={styles.bottomWrapper}>
                        <div className={styles.timecode}>{utils.getTimeInReadable(question.timecode)}</div>
                        <div className={styles.rightWrapper}>
                            <div className={`button ${styles.deleteButton}`} onClick={() => deleteQuestion(question)}>Löschen</div>
                            <div className={`button ${styles.edit}`} onClick={() => editQuestion(question)}>Bearbeiten</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
