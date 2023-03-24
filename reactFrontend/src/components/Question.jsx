import React, { useState, useEffect } from 'react'
import './css/questions.css'


export default function QuestionBox({questionData, setUserAnswer}) {

  var selected = Array.from({length: questionData.answers.length},() => false);
  const [selectedAnswers, setselectedAnswers] = useState(selected);
  const answers = questionData.answers.map((answer, index) => <div key={index} className={`questionElements answer ${selectedAnswers[index] ? "whiteborder" : "" }`} onClick={() => selectAnswer(index)}>{answer}</div>);
  
  function selectAnswer(index){
    var arr = selectedAnswers.slice(0);
    arr[index] = arr[index] == false ? true : false;
    setselectedAnswers(arr);
  }
  useEffect(() => {
    console.log(selectedAnswers)
  }, [selectedAnswers])
  
  function sendAnswer(){
    var answerIndexes = [];
    for (let step = 0; step < selectedAnswers.length; step++) {
      if(selectedAnswers[step]){
        answerIndexes.push(step);
      }
    }
    setUserAnswer(answerIndexes);
    console.log(answerIndexes);
  }
  
  return (
      <div id="question">
        <div className="questionElements" id="questionText"> {questionData.question}</div>
        <div id="answersWrapper">
          {answers}
        </div>
        <div id="answerbuttonWrapper">
          <div className="questionElements" id="answerbutton" onClick={() => sendAnswer()}>Antwort abschicken</div>
        </div>
      </div>
  )
}
