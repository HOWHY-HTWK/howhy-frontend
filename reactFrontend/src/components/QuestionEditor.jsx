import React, { useState, useEffect } from 'react'
import './css/questions.css'
import './css/questionEditor.css'
import { MdClose, MdAdd } from "react-icons/md"

export default function QuestionEditor({ saveNewQuestion, saveEditedQuestion, time, existingQuestion }) {
  const basequestion = existingQuestion == null ? {
    'type': 'multiplechoice',
    'question': '',
    'answers': [{ "id": 0, "text": '',}],
    'correctAnswers': [{'id': 0, 'correct':false}],
    'timecode': time
  } : {
     ...existingQuestion
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
          {question.correctAnswers.find(e => e.id == answer.id).correct ?
            <div className='circle answerCorrect correct' onClick={() => toggleCorrect(answer.id)}>richtig</div>
            : <div className='circle answerCorrect' onClick={() => toggleCorrect(answer.id)}>falsch</div>}

          <input className="input questionElements change" placeholder="Antwort hier eingeben" value={answer.text} onInput={e => handleAnswerChange(answer.id, e.target.value)}></input>
        </div>
      ));
  }

  function toggleCorrect(id) {
    const newCorrectAnswers = question.correctAnswers.map(e => e.id == id? {...e, correct: !e.correct }: e)
    setQuestion({ ...question, correctAnswers: newCorrectAnswers });
  }

  function getNewId() {
    return question.answers[question.answers.length - 1].id + 1;
  }

  function addAnswer() {
    let id = getNewId()
    setQuestion({ ...question, answers: [...question.answers, { id: id, text: ""}], correctAnswers: [...question.correctAnswers, { id: id, correct: false }] });
  }

  function deleteAnswer(id) {
    setQuestion({ ...question, answers: question.answers.filter(a => a.id !== id) });
  }

  function handleAnswerChange(id, input) {
    let newAnswer = question.answers.map(answer => answer.id == id ? { ...answer, text: input } : answer );
    setQuestion({ ...question, answers: newAnswer });
  }

  function saveQuestionAndReset() {
    localStorage.setItem('question', null);
    existingQuestion == null ? saveNewQuestion(question) : saveEditedQuestion(question)
  }

  function cancelAndReset() {
    localStorage.setItem('question', null);
    saveNewQuestion(null);
  }

}
