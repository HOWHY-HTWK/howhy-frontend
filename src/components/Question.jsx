import React, { useState, useEffect } from 'react'
import styles from './css/Question.module.css'
import axiosClient from '../../axios-client'

export default function Question({ questionData, setQuestionData, answeredCorrectly, videoId }) {
  var selected = Array.from({ length: questionData.answers.length }, () => false);

  const [selectedAnswers, setselectedAnswers] = useState(selected);
  const [answerCorrect, setAnswerCorrect] = useState(null);
  const answers = questionData.answers.map((answer, index) => <div key={answer.id} className={[styles.questionElement, styles.answer, (selectedAnswers[index] ? styles.whiteborder : null)].join(' ')} onClick={() => selectAnswer(index)}>{answer.text}</div>);

  function selectAnswer(index) {
    var arr = selectedAnswers.slice(0);
    arr[index] = arr[index] == false ? true : false;
    setselectedAnswers(arr);
  }

  function calcAnswerIndexes() {
    let answers = questionData.answers.map((answer, index) => ({ id: answer.id, correct: selectedAnswers[index] }))
    processAnswer(answers);
  }

  function processAnswer(answers) {
    if (answers.length != 0) {
      var request = {
        "questionId": questionData.id,
        "answers": answers
      }
      axiosClient.post(`api/videoDatas/checkAnswers/${videoId}`, request)
        .then((response) => {
          setAnswerCorrect(response.data.success)
          response.data.success ? answeredCorrectly() : null;
          setTimeout(function () {
            setAnswerCorrect(null)
            setQuestionData(null)
          }, 2000);
        }).catch((error) => {
          alert(JSON.stringify(error.response.data))
        })
    }
  }

  return (

    <div className={['wrap'].join()} >
      {answerCorrect != null ?
        <div className={[styles.question, 'center'].join(' ')} >
          <div className={[styles.feedback].join(' ')} >{answerCorrect ? "Richtig!" : "Leider Falsch"}</div>
        </div>
        :
        <div className={[styles.question].join(' ')} >
          <div className={[styles.questionElement, styles.questionText].join(' ')} > {questionData.question}</div>
          <div className={[styles.answersWrapper].join(' ')} >
            {answers}
          </div>
          <div className={[styles.answerButtonWrapper, 'center'].join(' ')}>
            <div className={[styles.questionElement, styles.answerButton, 'button'].join(' ')}  onClick={calcAnswerIndexes}>Antwort abschicken</div>
          </div>
        </div>}
    </div>
  )
}
