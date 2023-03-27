import React, { useState, useEffect } from 'react'
import './css/questions.css'
import axiosClient from '../../axios-client'
import * as utils from '../utils'


export default function QuestionEditor() {
  const basequestion = {
    'question': '',
    'answers': [{ "id": 0, "text": '' }],
    'correctAnswers': ['']
  }
  const localquestion = JSON.parse(localStorage.getItem('question'));
  const [question, setQuestion] = useState(localquestion == null ? basequestion : localquestion);

  useEffect(() => {
    localStorage.setItem('question', JSON.stringify(question));
  }, [question]);

  return (
    <div id="question">
      <div className="questionElements questionText">
        <input className="input questionElements questionInput" placeholder="Frage hier eingeben" value={question.question} onInput={e => setQuestion({ ...question, question: e.target.value })}></input>
      </div>
      <div id="answersWrapper">
        {getAnswers()}
      </div>
      <div className=" addAnswer" onClick={addAnswer}>+</div>
      <div onClick={saveQuestion}>Frage speichern</div>

    </div>
  )

  function saveQuestion(){
    
  }

  function getNewId(){
    return question.answers[question.answers.length-1].id +1;
  }

  function addAnswer() {
    setQuestion({ ...question, answers: [...question.answers, { id: getNewId(), text: '' }] });
  }

  function getAnswers() {
    return (
      question.answers.map((answer) =>
        <div className="questionElements" key={answer.id}>
          <div className="delete" onClick={() => deleteAnswer(answer.id)}>
            <div>x</div>
          </div>
          <input className="input questionElements change" placeholder="Antwort hier eingeben" value={answer.text} onInput={e => handleAnswerChange(answer.id, e.target.value)}></input>
        </div>
      ));
  }

  function deleteAnswer(id) {
    setQuestion({ ...question, answers: question.answers.filter(a => a.id !== id) });
  }

  function handleAnswerChange(key, input) {
    const newAnswer = question.answers.map((answer) => {
      if (answer.id === key) {
        return { id: answer.id, text: input };
      } else {
        return answer;
      }
    });
    setQuestion({ ...question, answers: newAnswer });
  }
}
