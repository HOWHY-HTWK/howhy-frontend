import React, { useState, useEffect } from 'react'
import questionStyles from './css/Question.module.css'
import styles from './css/QuestionEditor.module.css'
import { MdClose, MdAdd } from "react-icons/md"
import TimeCodePicker from './TimeCodePicker'
import TextareaAutosize from 'react-textarea-autosize';
import { storeQuestion } from '../api'


export default function QuestionEditor({ existingQuestion, duration, time, videoId, setEditedQuestion }) {
  const basequestion = existingQuestion ? existingQuestion : {
    'videoId': videoId,
    'questionText': '',
    'timecode': time,
    'type': 'multiplechoice',
    'correctAnswers': [{ 'id': 0, 'correct': false }],
    'answers': [{ "id": 0, "text": '', }],
  }

  const [question, setQuestion] = useState(basequestion);

  function setNewTimecode(timecode) {
    setQuestion({ ...question, timecode: timecode })
  }

  function toggleCorrect(id) {
    const newCorrectAnswers = question.correctAnswers.map(e =>
      e.id == id ? { ...e, correct: !e.correct } : e)
    setQuestion({ ...question, correctAnswers: newCorrectAnswers });
  }

  function getNewId() {
    return question.answers[question.answers.length - 1].id + 1;
  }

  function addAnswer() {
    let id = getNewId()
    setQuestion({
      ...question,
      answers: [...question.answers, { id: id, text: "" }],
      correctAnswers: [...question.correctAnswers, { id: id, correct: false }]
    });
  }

  function deleteAnswer(id) {
    setQuestion({
      ...question,
      answers: question.answers.filter(a => a.id !== id),
      correctAnswers: question.correctAnswers.filter(a => a.id !== id)
    });
  }

  function handleAnswerChange(id, input) {
    let newAnswer = question.answers.map(answer =>
      answer.id == id ? { ...answer, text: input } : answer);
    setQuestion({ ...question, answers: newAnswer });
  }

  function saveQuestionAndReset() {
    localStorage.setItem('question', null);
    storeQuestion(question).then(response => {
      setEditedQuestion(null)
    }).catch(error => {
      alert(error.response.data.message)
    })
  }

  function cancelAndReset() {
    localStorage.setItem('question', null);
    setEditedQuestion(null)
  }

  function getAnswers() {
    return (
      question.answers.map((answer) =>
        <div className={[questionStyles.questionElement, questionStyles.answer].join(' ')}
          key={answer.id}>
          {question.answers.length > 1 ?
            <div className={[styles.circle, styles.delete].join(' ')} onClick={() => deleteAnswer(answer.id)}>
              <MdClose></MdClose>
            </div>
            : null}
          {question.correctAnswers.find(e => e.id == answer.id).correct ?
            <div className={[styles.circle, styles.answerCorrect, styles.correct].join(' ')}
              onClick={() => toggleCorrect(answer.id)}>richtig</div>
            : <div className={[styles.circle, styles.answerCorrect].join(' ')}
              onClick={() => toggleCorrect(answer.id)}>falsch</div>}

          <TextareaAutosize className={[styles.input,
          questionStyles.questionElement,
          styles.change,
          questionStyles.answer].join(' ')}
            placeholder="Antwort hier eingeben"
            value={answer.text}
            onInput={e => handleAnswerChange(answer.id, e.target.value)}></TextareaAutosize>
        </div>
      ));
  }

  return (
    <div className={[questionStyles.question, styles.stretch].join(' ')} >
      <TimeCodePicker duration={duration} time={question.timecode}
        setTimeCode={setNewTimecode}></TimeCodePicker>
      <div className={[questionStyles.questionElement, questionStyles.questionText].join(' ')} >
        <TextareaAutosize
          className={[styles.input].join(' ')}
          placeholder="Frage hier eingeben" value={question.questionText}
          onInput={e => setQuestion({ ...question, questionText: e.target.value })} />
      </div>
      <div className={[questionStyles.answersWrapper].join(' ')} >
        {getAnswers()}
      </div>
      <MdAdd className={[styles.addAnswer].join(' ')} onClick={addAnswer}></MdAdd>
      <div className={[styles.buttonWrapper].join(' ')} >
        <div className={['button', styles.saveQuestion, styles.cancel].join(' ')}
          onClick={cancelAndReset}>Abbrechen</div>
        <div className={['button', styles.saveQuestion].join(' ')}
          onClick={saveQuestionAndReset}>Frage speichern</div>
      </div>
    </div>
  )
}
