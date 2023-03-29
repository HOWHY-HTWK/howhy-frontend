import React from 'react'
import { useState, useEffect, useRef } from 'react'
import QuestionEditor from '../components/QuestionEditor'
import QuestionsTimeline from '../components/QuestionsTimeline'
import axiosClient from '../../axios-client.jsx'
import * as utils from '../utils.js'
import './editQuestions.css'
import QuestionList from '../components/QuestionList'

export default function EditQuestions() {
  const queryParameters = new URLSearchParams(window.location.search)
  const currentQuestionEditor = JSON.parse(localStorage.getItem('question'))

  const [editedQuestion, seteditedQuestion] = useState(currentQuestionEditor != null ? 'multipleChoice' : null)
  const [questionType, setquestionType] = useState('multipleChoice')
  const [videoData, setvideoData] = useState(null)

  const selectBox = useRef(null)
  const videoId = queryParameters.get("id")
  //TODO change when login is done
  const creator = "alex";
  const iframe = useRef(null)
  const time = useRef(null)

  fetchQuestionsData()
  listenForTimeUpdate()

  return (
    <div id="wrapper">
      <iframe ref={iframe} id="iframe" src={`https://mediaserver.htwk-leipzig.de/permalink/${videoId}/iframe/`} allowFullScreen={false} ></iframe>
      {/* {videoData != null ? (<QuestionsTimeline id="questionsTimeline" videoData={videoData} jumpToTime={(time) => utils.jumpToTime(iframe, time)}></QuestionsTimeline>) : null} */}
      {displayAddQuestion()}
      {displayQuestionEditor()}
      {(editedQuestion == null) && (videoData != null) ? <QuestionList videoData={videoData} editQuestion={seteditedQuestion} deleteQuestion={deleteQuestion}></QuestionList> : null}
    </div>
  )

  function deleteQuestion(question){
    let index = videoData.data.findIndex(element => element.question == question.question);
    let newVideoData = videoData;
    newVideoData.data.splice(index, 1);
    newVideoData.correctAnswerIndexes.splice(index, 1);
    postNewVideoData(newVideoData);
  }

  function fetchQuestionsData() {
    useEffect(() => {
      axiosClient.get(`videoDatas/byVideoId/${videoId}`)
        .then((response) => {
          setvideoData(response.data)
        }).catch((error) => {
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
    if (question != null) {

      var baseRequest = {
        "videoId": videoId,
        "creator": creator,
        "data": [],
        "correctAnswerIndexes": []
      }

      var request = videoData != null ? videoData : baseRequest;

      var correctAnswers = [];
      for (let step = 0; step < question.answers.length; step++) {
        if (question.answers[step].correct) {
          correctAnswers.push(step)
        }
      }
      var reqQuestion = {
        "answers": question.answers.map((answer) => answer.text),
        "question": question.question,
        "timecode": question.timecode,
      }
      request.data.push(reqQuestion)
      request.correctAnswerIndexes.push(correctAnswers)
      postNewVideoData(request)

    } else {
      seteditedQuestion(null)
    }
  }

  function postNewVideoData(newVideoData){
    axiosClient.post(`videoDatas`, newVideoData)
    .then((newVideoData) => {
      seteditedQuestion(null)
      setvideoData(newVideoData.data);
    })
  }


  function displayQuestionEditor() {
    if (editedQuestion == null) {
      return null
    } else if (editedQuestion == 'multipleChoice') {
      return (
        <QuestionEditor saveQuestion={saveQuestion} time={time.current} existingQuestion={null} correctAnswerIndexes={null}></QuestionEditor>
      )
    } else if (typeof editedQuestion == 'object') {
      let index = videoData.data.findIndex(element => element.question == editedQuestion.question);
      let indexes = videoData.correctAnswerIndexes[index];
      return (
        <QuestionEditor saveQuestion={saveQuestion} time={time.current} existingQuestion={editedQuestion} correctAnswerIndexes={indexes}></QuestionEditor>
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
