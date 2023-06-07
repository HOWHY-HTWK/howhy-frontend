import React, { useState, useEffect } from 'react'
import styles from './css/Question.module.css'
import * as api from '../api'
import Loader from './Loader';
import bulb from '../assets/howhy_solid.svg'


export default function Question({ questionId, setQuestionId, refreshData }) {

    const [questionData, setQuestionData] = useState({ data: null, selected: [] });
    const [answerCorrect, setAnswerCorrect] = useState(null);

    const answers = questionData.data ? getAnswers(questionData.data) : null;

    useEffect(() => {
        api.getQuestionData(questionId).then(response => {
            let data = response.data
            let selected = Array.from({ length: data.answers.length }, () => false);
            setQuestionData({ data: data, selected: selected })
        })
    }, [questionId])

    function getAnswers(data) {
        return data.answers.map((answer, index) =>
            <div
                key={answer.id}
                className={[styles.questionElement, styles.answer, (questionData.selected[index] ? styles.whiteborder : null)].join(' ')}
                onClick={() => selectAnswer(index)}>
                {answer.text}
            </div>);
    }

    function selectAnswer(answerIndex) {
        if (questionData.data.type == 'singlechoice') {
            var arr = questionData.selected.map((element, index) => {
                return answerIndex == index ? !element : false
            })
            setQuestionData({ ...questionData, selected: arr });
        } else {
            var arr = questionData.selected.map((element, index) => {
                return answerIndex == index ? !element : element
            })
            setQuestionData({ ...questionData, selected: arr });
        }
    }

    function calcAnswerIndexes() {
        let answers = questionData.data.answers.map((answer, index) => ({ id: answer.id, correct: questionData.selected[index] }))
        processAnswer(answers);
    }

    function processAnswer(answers) {
        if (answers.length != 0) {
            var request = {
                "questionId": questionId,
                "answers": answers
            }
            api.checkAnswers(request)
                .then((response) => {
                    setAnswerCorrect(response.data.success)
                    refreshData()
                    setTimeout(function () {
                        setAnswerCorrect(null)
                        setQuestionId(null)
                    }, 4000);
                }).catch((error) => {
                    alert(JSON.stringify(error.response.data))
                })
        }
    }

    function winningAnimation() {
        let array = Array.from({ length: 10 })
        let bulbs = array.map((element, index) => {
            return (
                <img
                    key={index}
                    style={{
                        animationDelay: (index / 10) + 's',
                        "--translate-x": ((Math.random() * 15) - 7.5) + 'vw',
                        "--translate-y": ((Math.random() * 15) - 7.5) + 'vh',
                    }}
                    className={[styles.bulb, styles.winningAnimation].join(' ')}
                    src={bulb} >

                </img >
            )
        })
        return bulbs
    }

    return (
        questionData.data ?
            <div className={[styles.wrap].join()} >
                {answerCorrect != null ?
                    <>
                        {answerCorrect ? winningAnimation() : null}
                        < div className={[styles.question, 'center'].join(' ')} >
                            <div className={[styles.feedback].join(' ')} >
                                {answerCorrect ? "Richtig!" : "Leider Falsch"}
                            </div>
                        </div>
                    </>
                    :
                    <div className={[styles.question].join(' ')} >
                        <div className={[styles.questionElement, styles.questionText].join(' ')}>
                            {questionData.data.questionText}
                            <div className={[styles.type].join(' ')} >{questionData.data.type}</div>
                        </div>
                        <div className={[styles.answersWrapper].join(' ')} >
                            {answers}
                        </div>
                        <div className={[styles.answerButtonWrapper, 'center'].join(' ')}>
                            <div className={['button', styles.answerButton].join(' ')}
                                onClick={calcAnswerIndexes}>
                                Antwort abschicken
                            </div>
                        </div>
                    </div>
                }
            </div >
            :
            <Loader></Loader>
    )
}
