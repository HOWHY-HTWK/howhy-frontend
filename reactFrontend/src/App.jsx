import { useState, useEffect, useRef } from 'react'
import axiosClient from '../axios-client'
import './App.css'
import QuestionBox from './components/Question'
import QuestionsTimeline from './components/QuestionsTimeline'
import * as utils from './utils.js'

function App() {
  const [videoData, setVideoData] = useState(null)
  const [currentQuestionData, setCurrentQuestionData] = useState(null)
  const iframe = useRef(null);

  const videoId = "v12663c723847flqwp36"

  fetchQuestionsData();

  useEffect(() => {
    if(videoData != null){
      listenForTimeUpdate(videoData);
    }
  }, [videoData])
  
  return (
    <div id="wrapper">
      <iframe ref={iframe} id="iframe" src="https://mediaserver.htwk-leipzig.de/permalink/v12663c723847flqwp36/iframe"></iframe>
      {videoData != null ? (<QuestionsTimeline id="questionsTimeline" videoData={videoData} jumpToTime={(time) => utils.jumpToTime(iframe, time)}></QuestionsTimeline>) : null}
      {displayQuestion()}
    </div>
  )

  function displayQuestion() {
    if (currentQuestionData != null) {
      utils.pauseVideo(iframe);
      return (
        <QuestionBox questionData={currentQuestionData} setVideoData={setCurrentQuestionData} videoId={videoId}></QuestionBox>
      )
    }
    else {
      utils.playVideo(iframe);
      return null;
    }
}

function fetchQuestionsData() {
  useEffect(() => {
    axiosClient.get(`videoDatas/byVideoId/${videoId}`)
      .then((response) => {
        setVideoData(response.data)
      })
  }, [])
}

function listenForTimeUpdate(videoData) {

  let timecodes = utils.makeTimecodesList(videoData.data)

  window.addEventListener('message', function (event) {

    if ('time' in event.data) {
      var questionIndex = utils.findQuestionIndex(event.data.time, timecodes);
      if(questionIndex != null){
        let tempQuestionData = videoData.data[questionIndex]
        tempQuestionData.index = questionIndex;
        setCurrentQuestionData(tempQuestionData);
      }

    } else if ('state' in event.data) {
    } else if ('duration' in event.data) {
    }
  }, false)
}

}

export default App
