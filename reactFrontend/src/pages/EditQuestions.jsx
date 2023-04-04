import React from 'react'
import { useState, useEffect, useRef } from 'react'
import QuestionEditor from '../components/QuestionEditor'
import axiosClient from '../../axios-client.jsx'
import './editQuestions.css'
import QuestionList from '../components/QuestionList'

export default function EditQuestions() {
  const queryParameters = new URLSearchParams(window.location.search)

  const [editedQuestion, seteditedQuestion] = useState(JSON.parse(localStorage.getItem('question')) != null ? 'multipleChoice' : null)
  const [questionType, setquestionType] = useState('multipleChoice')
  const [videoData, setvideoData] = useState(null)
  

  const videoId = queryParameters.get("id")
  //TODO change when login is done
  const creator = "alex";
  const iframe = useRef(null)
  const time = useRef(null)

  fetchQuestionsData()
  refreshCurrentTime()

  return (
    <div id="wrapper">
      <div>{videoId}</div>
      <iframe ref={iframe} id="iframe" src={`https://mediaserver.htwk-leipzig.de/permalink/${videoId}/iframe/player/`} allowFullScreen={false} ></iframe>
      {displayAddQuestion()}
      {displayQuestionEditor()}
      {(editedQuestion == null) && (videoData != null) ? <QuestionList videoData={videoData} editQuestion={seteditedQuestion} deleteQuestion={deleteQuestion}></QuestionList> : null}
    </div>
  )

  function deleteQuestion(question) {
    let index = videoData.data.findIndex(element => element.id == question.id);
    let newVideoData = videoData;
    newVideoData.data.splice(index, 1);
    newVideoData.correctAnswerIndexes.splice(index, 1);
    postNewVideoData(newVideoData);
  }

  function fetchQuestionsData() {
    useEffect(() => {
      axiosClient.get(`api/videoDatas/byVideoId/${videoId}`)
        .then((response) => {
          setvideoData(response.data)
        }).catch((error) => {
        })
    }, [])
  }

  function displayAddQuestion() {
    if (editedQuestion == null) {
      return (
        <>
          <select className="selector" value={questionType} onChange={e => setquestionType(e.target.value)}  >
            <option value="multipleChoice">Multiple Choice</option>
            <option value="singleChoice">Single Choice</option>
          </select>
          <button className="addBtn" onClick={() => seteditedQuestion(questionType)}>{questionType}-Frage zum aktuellen Zeitpunk hinzufügen</button>
        </>
      )
    }
  }

  function saveEditedQuestion(question) {
    var newVideoData = videoData;
    let newQuestion = {
      ...question,
      "answers": question.answers.map((answer) => answer.text),
    }
    let correctAnswers = question.answers
      .map((answer, index) => answer.correct ? index : null)
      .filter(element => element != null);
    let questionIndex = videoData.data.findIndex(element => (element.id == question.id));
    newVideoData.data[questionIndex] = newQuestion;
    newVideoData.correctAnswerIndexes[questionIndex] = correctAnswers
    postNewVideoData(newVideoData)
    seteditedQuestion(null)
  }

  function saveNewQuestion(question) {
    if (question != null) {
      let baseVideoData = {
        "videoId": videoId,
        "creator": creator,
        "data": [],
        "correctAnswerIndexes": []
      }
      let newQuestion = {
        ...question,
        "answers": question.answers.map((answer) => answer.text),
        "id": getNewQuestionId()
      }
      let newVideoData = videoData != null ? videoData : baseVideoData;
      newVideoData.data.push(newQuestion)
      let correctAnswers = question.answers
        .map((answer, index) => answer.correct ? index : null)
        .filter(element => element != null);
      newVideoData.correctAnswerIndexes.push(correctAnswers)
      postNewVideoData(newVideoData)
    }
    seteditedQuestion(null)
  }

  function getNewQuestionId() {
    return videoData == null ? 0 : videoData.data.at(-1) == null ? 0 : videoData.data.at(-1).id + 1
  }

  function postNewVideoData(newVideoData) {
    axiosClient.post(`/api/videoDatas`, newVideoData)
      .then((newVideoData) => {
        setvideoData(newVideoData.data);
      })
  }

  function displayQuestionEditor() {
    if (editedQuestion == null) {
      return null
    } else if (editedQuestion == 'multipleChoice') {
      return <QuestionEditor saveNewQuestion={saveNewQuestion} saveEditedQuestion={saveEditedQuestion} time={time.current} existingQuestion={null} correctAnswerIndexes={null}></QuestionEditor>
    } else if (typeof editedQuestion == 'object') {
      let index = videoData.data.findIndex(element => element.id == editedQuestion.id);
      let indexes = videoData.correctAnswerIndexes[index];
      return <QuestionEditor saveNewQuestion={saveNewQuestion} saveEditedQuestion={saveEditedQuestion} time={time.current} existingQuestion={editedQuestion} correctAnswerIndexes={indexes}></QuestionEditor>
    }
  }

  function refreshCurrentTime() {
    window.addEventListener('message', function (event) {
      if ('time' in event.data) {
        time.current = event.data.time
      } 
    }, false)
  }
}
