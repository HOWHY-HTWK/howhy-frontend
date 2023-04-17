import React, { useState, useEffect } from 'react'
import questionStyles from './css/Question.module.css'
import styles from './css/QuestionEditor.module.css'
import { MdClose, MdAdd } from "react-icons/md"
import TimeCodePicker from './TimeCodePicker'
import TextareaAutosize from 'react-textarea-autosize';


export default function QuestionEditor({ saveNewQuestion, saveEditedQuestion, duration, time, existingQuestion }) {
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
    <div className={[questionStyles.question, styles.stretch].join(' ')} >
      <TimeCodePicker duration={duration} time={question.timecode} setTimeCode={setNewTimecode}></TimeCodePicker>
      <div className={[questionStyles.questionElement, questionStyles.questionText].join(' ')} >
        <TextareaAutosize className={[styles.input].join(' ')}  placeholder="Frage hier eingeben" value={question.question} onInput={e => setQuestion({ ...question, question: e.target.value })}></TextareaAutosize>
      </div>
      <div className={[questionStyles.answersWrapper].join(' ')} >
        {getAnswers()}
      </div>
      <MdAdd className={[styles.addAnswer].join(' ')}  onClick={addAnswer}></MdAdd>
      <div className={[styles.buttonWrapper].join(' ')} >
        <div className={['button', styles.saveQuestion, styles.cancel].join(' ')}  onClick={cancelAndReset}>Abbrechen</div>
        <div className={['button', styles.saveQuestion].join(' ')}  onClick={saveQuestionAndReset}>Frage speichern</div>
      </div>
    </div>
  )

  function setNewTimecode(timecode){
    setQuestion({...question, timecode: timecode})
  }

  function getAnswers() {
    return (
      question.answers.map((answer) =>
        <div className={[questionStyles.questionElement, questionStyles.answer].join(' ')}  key={answer.id}>
          {question.answers.length > 1 ?
            <div className={[styles.circle, styles.delete].join(' ')}  onClick={() => deleteAnswer(answer.id)}>
              <MdClose></MdClose>
            </div>
            : null}
          {question.correctAnswers.find(e => e.id == answer.id).correct ?
            <div className={[styles.circle, styles.answerCorrect, styles.correct].join(' ')}  onClick={() => toggleCorrect(answer.id)}>richtig</div>
            : <div className={[styles.circle, styles.answerCorrect].join(' ')}  onClick={() => toggleCorrect(answer.id)}>falsch</div>}

          <TextareaAutosize className={[styles.input, questionStyles.questionElement, styles.change, questionStyles.answer].join(' ')}  placeholder="Antwort hier eingeben" value={answer.text} onInput={e => handleAnswerChange(answer.id, e.target.value)}></TextareaAutosize>
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
    setQuestion({ ...question, answers: question.answers.filter(a => a.id !== id), correctAnswers: question.correctAnswers.filter(a => a.id !== id) });
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
