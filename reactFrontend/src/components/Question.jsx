import React, { useState, useEffect } from 'react'
import './questions.css'


export default function QuestionBox({questionData, setUserAnswer}) {

  const answers = questionData.answers.map(answer => <div class="questionElements answer">{answer}</div>);
  return (
      <div id="question">
        <div class="questionElements" id="questionText"> {questionData.question}</div>
        <div id="answersWrapper">
          {answers}
        </div>
        <div id="answerbuttonWrapper">
          <div class="questionElements" id="answerbutton" onClick={() => setUserAnswer([1])}>Antwort abschicken</div>
        </div>
      </div>
  )
}
