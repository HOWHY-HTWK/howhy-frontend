import React from 'react'
import styles from './QuestionList.module.css'
import * as utils from 'src/utils/utils.js'

/**
 * Displays a list of all Quesiton for the Video with delete and edit buttons.
 * The list is oredered according to the timecodes of the questions.
 * 
 * @param {List} questions 
 * @param {Function} editQuestion 
 * @param {Function} deleteQuestion 
 * @returns 
 */
export default function QuestionList({ questions, editQuestion, deleteQuestion }) {
    const orderedQuestions = questions.sort((first, last) => first.timecode - last.timecode)
    const listElements = orderedQuestions.map(question => getListElement(question));

    function getListElement(question) {
        return (
            <div className={'listElement'} key={question.id} onClick={() => null}>
                <div className={''}>
                    <div className={['center', styles.topWrapper].join(' ')} >
                        <div>{question.questionText}</div>
                        <div className={[styles.type].join(' ')} >{question.type}</div>
                    </div>
                    <div className={styles.bottomWrapper}>
                        <div className={styles.timecode}>
                            {utils.getTimeInReadable(question.timecode)}
                        </div>
                        <div className={styles.rightWrapper}>
                            <div className={`button ${styles.deleteButton}`}
                                onClick={() => deleteQuestion(question)}>
                                Löschen
                            </div>
                            <div className={`button ${styles.edit}`}
                                onClick={() => editQuestion(question)}>
                                Bearbeiten
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={[styles.wrap].join(' ')} >
            <h3>Existierende Fragen:</h3>
            {listElements.length > 0 ? <div>{listElements}</div> : 'Für dieses Video gibt es noch keine Fragen'}
        </div>
    )
}
