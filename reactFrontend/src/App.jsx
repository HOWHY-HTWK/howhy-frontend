import { useState, useEffect, useRef } from 'react'
import axiosClient from '../axios-client'
import './App.css'
import QuestionBox from './components/Question'
import QuestionsTimeline from './components/QuestionsTimeline'
import * as utils from './utils.js'

function App() {
  const [questionData, setQuestionData] = useState(null)
  const [timecodes, setTimecodes] = useState([])
  const iframe = useRef(null);

  const videoId = "v12663c723847flqwp36"

  fetchQuestionsData();

  return (
    <div id="wrapper">
      <iframe ref={iframe} id="iframe" src="https://mediaserver.htwk-leipzig.de/permalink/v12663c723847flqwp36/iframe"></iframe>
      {timecodes != null ? (<QuestionsTimeline id="questionsTimeline" timecodes={timecodes} jumpToTime={(time) => utils.jumpToTime(iframe, time)}></QuestionsTimeline>) : null}
      {displayQuestion()}
    </div>
  )

  function displayQuestion() {
    if (questionData != null) {
      utils.pauseVideo(iframe);
      return (
        <QuestionBox questionData={questionData} setVideoData={setQuestionData} videoId={videoId}></QuestionBox>
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
        var localtimecodes = utils.makeTimecodesList(response.data.data);
        listenForTimeUpdate(localtimecodes, response.data);
        setTimecodes(localtimecodes);
      })
  }, [])
}

function listenForTimeUpdate(localtimecodes, allVideoData) {
  window.addEventListener('message', function (event) {
    // Check that the message comes from the player iframe.
    // Handle event data.
    if ('time' in event.data) {
      // console.log('New player time:', event.data.time);
      var videoData = utils.setQuestion(event.data.time, localtimecodes, allVideoData);
      setQuestionData(videoData);
    } else if ('state' in event.data) {
      // console.log('New player state:', event.data.state)
    } else if ('duration' in event.data) {
      // console.log('New player duration:', event.data.duration)
    }
  }, false)
}

}

export default App
