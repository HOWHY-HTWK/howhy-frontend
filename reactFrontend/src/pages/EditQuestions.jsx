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
  const [questionType, setquestionType] = useState('multipleChoice')
  const [timecodes, setTimecodes] = useState([])
  const [videoData, setvideoData] = useState(null)

  const selectBox = useRef(null);
  const videoId = queryParameters.get("id")
  const iframe = useRef(null);
  const time = useRef(null);

  fetchQuestionsData()
  listenForTimeUpdate();

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
          console.log(response.data)
          var localtimecodes = utils.makeTimecodesList(response.data.data)
          setTimecodes(localtimecodes)
          setvideoData(response.data)
        })
        //TODO Fail
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

      // console.log(question);

      var request = videoData

      var reqQuestion = {
        "answers": question.answers.map((answer) => answer.text),
        "question": question.question,
        "timecode": question.timecode
        
      }

      request.data.push(reqQuestion)

      console.log(request)

      axiosClient.post(`videoDatas`, request)
        .then((response) => {
          setTimeout(function () {
            console.log(response)
            seteditedQuestion(null)
            
          }, 2000);

        })
      seteditedQuestion(null)
        
    } else {
      seteditedQuestion(null)
    }

    }
  

  function displayQuestionEditor() {
    if (editedQuestion == 'multipleChoice') {

      return (
        <QuestionEditor saveQuestion={saveQuestion} time={time.current}></QuestionEditor>
      )
    }
  }

  function addQuestion() {

    seteditedQuestion(questionType);

  }

  function listenForTimeUpdate(localtimecodes, allVideoData) {
    window.addEventListener('message', function (event) {
      if ('time' in event.data) {
        time.current = event.data.time
      } else if ('state' in event.data) {
      } else if ('duration' in event.data) {
      }
    }, false)
  }
}
