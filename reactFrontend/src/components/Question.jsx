import React, { useState, useEffect } from 'react'
import './css/questions.css'
import axiosClient from '../../axios-client'

export default function Question({ questionData, setQuestionData, answeredCorrectly, videoId }) {
  var selected = Array.from({ length: questionData.answers.length }, () => false);

  const [selectedAnswers, setselectedAnswers] = useState(selected);
  const [answerCorrect, setAnswerCorrect] = useState(null);
  const answers = questionData.answers.map((answer, index) => <div key={answer.id} className={`questionElements answer ${selectedAnswers[index] ? "whiteborder" : ""}`} onClick={() => selectAnswer(index)}>{answer.text}</div>);

  function selectAnswer(index) {
    var arr = selectedAnswers.slice(0);
    arr[index] = arr[index] == false ? true : false;
    setselectedAnswers(arr);
  }

  function calcAnswerIndexes() {
    let answers = questionData.answers.map((answer, index) => ({id: answer.id, correct: selectedAnswers[index]}))
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
          console.log(response)
          setAnswerCorrect(response.data.success)
          response.data.success ? answeredCorrectly(): null;
          setTimeout(function () {
            setAnswerCorrect(null)
            setQuestionData(null)
          }, 2000);
        }).catch((error) => {
          alert(JSON.stringify(error.response.data))
        })
    }
  }

  function answerFeedback() {
    if (answerCorrect != null) {
      return (
        <div className="questionElements">{answerCorrect ? "Richtig!" : "Leider Falsch"}</div>
      )
    } else {
      return (
        <div id="question">
          <div className="questionElements questionText"> {questionData.question}</div>
          <div id="answersWrapper">
            {answers}
          </div>
          <div id="answerbuttonWrapper">
            <div className="questionElements" id="answerbutton" onClick={calcAnswerIndexes}>Antwort abschicken</div>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      {answerFeedback()}
    </>

  )
}
