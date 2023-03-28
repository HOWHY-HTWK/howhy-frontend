import React from 'react'
import { useState, useEffect, useRef } from 'react'
import QuestionEditor from '../components/QuestionEditor'
import QuestionsTimeline from '../components/QuestionsTimeline'
import axiosClient from '../../axios-client.jsx'
import * as utils from '../utils.js'
import './editQuestions.css'

export default function EditQuestions() {
  const queryParameters = new URLSearchParams(window.location.search)
  const currentQuestionEditor = JSON.parse(localStorage.getItem('question'))
  const [editedQuestion, seteditedQuestion] = useState( currentQuestionEditor != null ? 'multipleChoice' : null)
  const [questionType, setquestionType] = useState('multipleChoice');
  const [timecodes, setTimecodes] = useState([])

  const selectBox = useRef(null);
  const videoId = queryParameters.get("id")
  const iframe = useRef(null);

  fetchQuestionsData()

  return (
    <div id="wrapper">
      <iframe ref={iframe} id="iframe" src={`https://mediaserver.htwk-leipzig.de/permalink/${videoId}/iframe/`} allowFullScreen={false} ></iframe>
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
    if (editedQuestion != 'multipleChoice') {
      return (
        <>
          <select className="selector" value={questionType} onChange={e => setquestionType(e.target.value)} ref={selectBox} >
            <option value="multipleChoice">Multiple Choice</option>
            <option value="singleChoice">Single Choice</option>
          </select>
          <button className="addBtn" onClick={addQuestion}>{questionType}-Frage zum aktuellen Zeitpunk hinzufügen</button>
        </>
      )
    } 
  }

  function saveQuestion(question) {
    if(question != null){
      console.log(question);
      // var request = {
      //   "questionIndex": questionData.index,
      //   "answers": answer
      // }
      // axiosClient.post(`videoDatas/${videoId}`, request)
      //   .then((response) => {
      //     setAnswerCorrect(response.data.success)
      //     setTimeout(function () {
      //       seteditedQuestion(null)
            
      //     }, 2000);

      //   })
      seteditedQuestion(null)

    } else{
      seteditedQuestion(null)

    }


    }
  

  function displayQuestionEditor() {
    if (editedQuestion == 'multipleChoice') {
      return (
        <QuestionEditor saveQuestion={saveQuestion}></QuestionEditor>
      )
    }
  }

  function addQuestion() {

    seteditedQuestion(questionType);

  }
}
