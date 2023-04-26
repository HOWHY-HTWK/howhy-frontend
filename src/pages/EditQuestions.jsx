import React from 'react'
import { useState, useEffect, useRef } from 'react'
import QuestionEditor from '../components/QuestionEditor'
import axiosClient from '../../axios-client.jsx'
import styles from './css/EditQuestions.module.css'
import QuestionList from '../components/QuestionList'
import * as api from '../api'

export default function EditQuestions() {
  const queryParameters = new URLSearchParams(window.location.search)
  const videoId = queryParameters.get("id")

  const [editedQuestion, setEditedQuestion] = useState(JSON.parse(localStorage.getItem('question')) != null ? 'multipleChoice' : null)
  const [questionType, setquestionType] = useState('multipleChoice')
  const [questions, setQuestions] = useState(null)

  const iframe = useRef(null)
  const time = useRef(null)
  const duration = useRef(null)

  useEffect(() => {
    loadQuestions()
  }, [])

  useEffect(() => {
    if (!editedQuestion) {
      loadQuestions()
    }
  }, [editedQuestion])

  function loadQuestions() {
    api.getQuestions(videoId)
      .then((response) => {
        setQuestions(response.data)
      }).catch((error) => {
        alert('fragen konnten nicht geladen werden')
      })
  }

  refreshCurrentTime()

  return (
    <div className={[styles.wrapper].join(' ')} >
      <div>{videoId}</div>
      <iframe ref={iframe} className={[styles.iframe].join(' ')} src={`https://mediaserver.htwk-leipzig.de/permalink/${videoId}/iframe/player/`} allowFullScreen={false} ></iframe>
      {displayAddQuestion()}
      {displayQuestionEditor()}
      {!editedQuestion && questions ? <QuestionList questions={questions} editQuestion={setEditedQuestion} deleteQuestion={deleteQuestion} seteditedQuestion={setEditedQuestion}></QuestionList> : null}
    </div>
  )

  function displayAddQuestion() {
    if (editedQuestion == null) {
      return (
        <div className={[styles.addWrapper].join(' ')} >
          <select className="selector" value={questionType} onChange={e => setquestionType(e.target.value)}  >
            <option value="multipleChoice">Multiple Choice</option>
            <option value="singleChoice">Single Choice</option>
          </select>
          <button className="button" onClick={() => setEditedQuestion(questionType)}>{questionType}-Frage zum aktuellen Zeitpunk hinzufügen</button>
        </div>
      )
    }
  }

  function displayQuestionEditor() {
    if (editedQuestion == null) {
      return null
    } else if (editedQuestion == 'multipleChoice') {
      return <QuestionEditor duration={duration.current} time={time.current} existingQuestion={null} videoId={videoId} setEditedQuestion={setEditedQuestion}></QuestionEditor>
    } else if (typeof editedQuestion == 'object') {
      return <QuestionEditor duration={duration.current} time={time.current} existingQuestion={editedQuestion} videoId={videoId} setEditedQuestion={setEditedQuestion}></QuestionEditor>
    }
  }

  function deleteQuestion(question) {
    if (confirm('wirklich löschen?')) {
      api.deleteQuestion(question.id).then(response => {
        loadQuestions()
      }).catch(error => {
        alert(error.response.data.message)
      })
    }
  }

  function refreshCurrentTime() {
    window.addEventListener('message', function (event) {
      if ('time' in event.data) {
        time.current = event.data.time
      }
      if ('duration' in event.data) {
        duration.current = event.data.duration
      }
    }, false)
  }
}
