import React from 'react'
import { useState, useEffect, useRef } from 'react'
import QuestionEditor from '../components/QuestionEditor'


export default function EditQuestions() {
  const queryParameters = new URLSearchParams(window.location.search)
  const [editedQuestion, seteditedQuestion] = useState(null)
  const [questionType, setquestionType] = useState('multipleChoice');
  const selectBox = useRef(null);
  const id = queryParameters.get("id")

  return (
    <>
      <div>EditQuestions</div>
      <iframe id="iframe" src={`https://mediaserver.htwk-leipzig.de/permalink/${id}/iframe/`} allowFullScreen={false} ></iframe>
        <select value={questionType} onChange={e => setquestionType(e.target.value)} ref={selectBox} >
          <option value="multipleChoice">Multiple Choice</option>
          <option value="singleChoice">Single Choice</option>
        </select>
        <button onClick={addQuestion}>{questionType}-Frage zum aktuellen Zeitpunk hinzufügen</button>
        {displayQuestionEditor()}
    </>
  )

  function displayQuestionEditor(){
    if(editedQuestion == 'multipleChoice'){
      return (
      <QuestionEditor></QuestionEditor>
      )
    }
  }
  function addQuestion() {
    
    seteditedQuestion(questionType);

  }
}
