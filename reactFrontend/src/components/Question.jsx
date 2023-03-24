import React, { useState, useEffect } from 'react'
import './css/questions.css'
import axiosClient from '../../axios-client'

export default function QuestionBox({questionData, setVideoData, videoId}) {
  var selected = Array.from({length: questionData.answers.length},() => false);

  const [selectedAnswers, setselectedAnswers] = useState(selected);
  const [answerCorrect, setAnswerCorrect] = useState(null);
  const answers = questionData.answers.map((answer, index) => <div key={index} className={`questionElements answer ${selectedAnswers[index] ? "whiteborder" : "" }`} onClick={() => selectAnswer(index)}>{answer}</div>);
  
  function selectAnswer(index){
    var arr = selectedAnswers.slice(0);
    arr[index] = arr[index] == false ? true : false;
    setselectedAnswers(arr);
  }

  function sendAnswer(){
    var answerIndexes = [];
    for (let step = 0; step < selectedAnswers.length; step++) {
      if(selectedAnswers[step]){
        answerIndexes.push(step);
      }
    }
    processAnswer(answerIndexes);
    
  }

  function processAnswer(answer) {
    if (answer != []) {
      var request = {
        "questionIndex": questionData.index,
        "answers": answer
      }
      axiosClient.post(`videoDatas/checkAnswers/${videoId}`, request )
        .then((response) => {
          setAnswerCorrect(response.data.success)
          setTimeout(function() {
            setAnswerCorrect(null)
            setVideoData(null)
          }, 2000);
        
        })
    }
  }

  function answerFeedback(){
    if(answerCorrect != null){
      return (
        <div>{answerCorrect ? "Richtig!" : "Leider Falsch"}</div>
        )
    }
  }
  
  return (
    <>
      <div id="question">
        <div className="questionElements" id="questionText"> {questionData.question}</div>
        <div id="answersWrapper">
          {answers}
        </div>
        <div id="answerbuttonWrapper">
          <div className="questionElements" id="answerbutton" onClick={sendAnswer}>Antwort abschicken</div>
        </div>
      </div>
      {answerFeedback()}
      </>

  )
}
