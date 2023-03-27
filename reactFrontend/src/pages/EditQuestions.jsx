import React from 'react'
import { useState, useEffect, useRef } from 'react'
import QuestionEditor from '../components/QuestionEditor'
import QuestionsTimeline from '../components/QuestionsTimeline'
import axiosClient from '../../axios-client.jsx'
import * as utils from '../utils.js'

export default function EditQuestions() {
  const queryParameters = new URLSearchParams(window.location.search)
  const [editedQuestion, seteditedQuestion] = useState('multipleChoice')
  const [questionType, setquestionType] = useState('multipleChoice');
  const [timecodes, setTimecodes] = useState([])

  const selectBox = useRef(null);
  const videoId = queryParameters.get("id")
  const iframe = useRef(null);

  fetchQuestionsData()

  return (
    <div id="wrapper">
      {/* <iframe ref={iframe} id="iframe" src={`https://mediaserver.htwk-leipzig.de/permalink/${videoId}/iframe/`} allowFullScreen={false} ></iframe> */}
      {timecodes != null ? (<QuestionsTimeline id="questionsTimeline" timecodes={timecodes} jumpToTime={(time) => utils.jumpToTime(iframe, time)}></QuestionsTimeline>) : null}
      {displayAddQuestion()}
      {displayQuestionEditor()}
    </div>
  )

  function fetchQuestionsData() {
    useEffect(() => {
      axiosClient.get(`videoDatas/byVideoId/${videoId}`)
        .then((response) => {
          var localtimecodes = utils.makeTimecodesList(response.data.data);
          setTimecodes(localtimecodes);
        })
    }, [])
  }

  function displayAddQuestion() {
    if (editedQuestion == null) {
      return (
        <>
          <select value={questionType} onChange={e => setquestionType(e.target.value)} ref={selectBox} >
            <option value="multipleChoice">Multiple Choice</option>
            <option value="singleChoice">Single Choice</option>
          </select>
          <button onClick={addQuestion}>{questionType}-Frage zum aktuellen Zeitpunk hinzufügen</button>
        </>
      )
    }
  }

  function displayQuestionEditor() {
    if (editedQuestion == 'multipleChoice') {
      return (
        <QuestionEditor></QuestionEditor>
      )
    }
  }
  
  function addQuestion() {

    seteditedQuestion(questionType);

  }
}
