import React, { useState, useEffect } from 'react'
import styles from './css/Question.module.css'
import * as api from '../api'

export default function Question({ questionId, setQuestionId}) {

  const [questionData, setQuestionData] = useState({ data: null, selected: [] });
  const [answerCorrect, setAnswerCorrect] = useState(null);

  const answers = questionData.data ? getAnswers(questionData.data) : null;

  useEffect(() => {
    api.getQuestionData(questionId).then(response => {
      let data = response.data
      let selected = Array.from({ length: data.answers.length }, () => false);
      setQuestionData({ data: data, selected: selected})
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
    var arr = questionData.selected.map((element, index) => {
      return answerIndex == index ? !element : element
    })
    setQuestionData({...questionData, selected: arr});
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
          setTimeout(function () {
            setAnswerCorrect(null)
            setQuestionId(null)
          }, 1000);
        }).catch((error) => {
          alert(JSON.stringify(error.response.data))
        })
    }
  }

  return questionData.data ?
    <div className={['wrap'].join()} >
      {answerCorrect != null ?
        <div className={[styles.question, 'center'].join(' ')} >
          <div className={[styles.feedback].join(' ')} >{answerCorrect ? "Richtig!" : "Leider Falsch"}</div>
        </div>
        :
        <div className={[styles.question].join(' ')} >
          <div className={[styles.questionElement, styles.questionText].join(' ')} > {questionData.data.questionText}</div>
          <div className={[styles.answersWrapper].join(' ')} >
            {answers}
          </div>
          <div className={[styles.answerButtonWrapper, 'center'].join(' ')}>
            <div className={[styles.questionElement, styles.answerButton, 'button'].join(' ')} onClick={calcAnswerIndexes}>Antwort abschicken</div>
          </div>
        </div>}
    </div>
    : <div>loading</div>
}
