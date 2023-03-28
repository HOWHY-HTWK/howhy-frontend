import React, { useState, useEffect } from 'react'
import './css/questions.css'
import './css/questionEditor.css'
import axiosClient from '../../axios-client'
import * as utils from '../utils'


export default function QuestionEditor({ saveQuestion, time }) {
  const basequestion = {
    'question': '',
    'answers': [{ "id": 0, "text": '' }],
    'correctAnswers': [''],
    'timecode': time
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
        <div className="addAnswer btn" onClick={addAnswer}>+</div>
      </div>
      <div className='buttonWrapper'>
        <div className="btn saveQuestion cancel" onClick={cancelAndReset}>Abbrechen</div>
        <div className="btn saveQuestion " onClick={saveQuestionAndReset}>Frage speichern</div>
      </div>



    </div>
  )

  function saveQuestionAndReset() {
    var tempquestion = question;
    localStorage.setItem('question', null);
    saveQuestion(tempquestion);
  }

  function cancelAndReset(){
    localStorage.setItem('question', null);
    saveQuestion(null);
  }

  function getNewId() {
    return question.answers[question.answers.length - 1].id + 1;
  }

  function addAnswer() {
    setQuestion({ ...question, answers: [...question.answers, { id: getNewId(), text: '' }] });
  }

  function getAnswers() {
    return (
      question.answers.map((answer) =>
        <div className="questionElements" key={answer.id}>
          <div className="delete" onClick={() => deleteAnswer(answer.id)}>
            <div className='deleteSymbol'>X</div>
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
