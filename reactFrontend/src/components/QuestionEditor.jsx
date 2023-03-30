import React, { useState, useEffect } from 'react'
import './css/questions.css'
import './css/questionEditor.css'
import axiosClient from '../../axios-client'
import * as utils from '../utils'
import { MdClose, MdAdd, MdCheck } from "react-icons/md"


export default function QuestionEditor({ saveNewQuestion, saveEditedQuestion,  time, existingQuestion, correctAnswerIndexes }) {
  const basequestion = existingQuestion == null ? {
    'question': '',
    'answers': [{ "id": 0, "text": '', "correct": false }],
    'correctAnswers': [''],
    'timecode': time
  } : {
    'question': existingQuestion.question,
    'answers': existingQuestion.answers.map((answer, index) => ({'id': index, "text":answer, "correct": correctAnswerIndexes.includes(index) }) ),
    'correctAnswers': correctAnswerIndexes,
    'timecode': existingQuestion.timecode,
    'id': existingQuestion.id
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
      <MdAdd className='addAnswer' onClick={addAnswer}></MdAdd>

      <div className='buttonWrapper'>
        <div className="btn saveQuestion cancel" onClick={cancelAndReset}>Abbrechen</div>
        <div className="btn saveQuestion " onClick={saveQuestionAndReset}>Frage speichern</div>
      </div>
    </div>
  )

  function getAnswers() {
    return (
      question.answers.map((answer) =>
        <div className="questionElements" key={answer.id}>
          {question.answers.length > 1 ?
                      <div className="circle delete" onClick={() => deleteAnswer(answer.id)}>
                      <MdClose></MdClose>
                    </div>
            : null}

          {answer.correct ? <div className='circle answerCorrect correct' onClick={()=> toggleCorrect(answer.id)}>richtig</div>
            : <div className='circle answerCorrect' onClick={()=> toggleCorrect(answer.id)}>falsch</div>
          }
          <input className="input questionElements change" placeholder="Antwort hier eingeben" value={answer.text} onInput={e => handleAnswerChange(answer.id, e.target.value)}></input>
        </div>
      ));
  }

  function toggleCorrect(id) {
    const newAnswer = question.answers.map((answer) => {
      if (answer.id === id) {
        let correct = answer.correct ? false : true;
        return { ...answer, correct: correct};
      } else {
        return answer;
      }
    });
    setQuestion({ ...question, answers: newAnswer });
  }

  function saveQuestionAndReset() {
    localStorage.setItem('question', null);
    if(existingQuestion == null){
      saveNewQuestion(question);
    } else {
      saveEditedQuestion(question)
    }
  }

  function cancelAndReset() {
    localStorage.setItem('question', null);
    saveNewQuestion(null);
  }

  function getNewId() {
    return question.answers[question.answers.length - 1].id + 1;
  }

  function addAnswer() {
    setQuestion({ ...question, answers: [...question.answers, { id: getNewId(), text: '', correct: false}] });
  }

  function deleteAnswer(id) {
    setQuestion({ ...question, answers: question.answers.filter(a => a.id !== id) });
  }

  function handleAnswerChange(key, input) {
    const newAnswer = question.answers.map((answer) => {
      if (answer.id === key) {
        return { ...answer, text: input };
      } else {
        return answer;
      }
    });
    setQuestion({ ...question, answers: newAnswer });
  }
}
