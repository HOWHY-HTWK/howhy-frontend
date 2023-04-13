import { useState, useEffect, useRef } from 'react'
import axiosClient from '../../axios-client'
import './css/watchVideo.css'
import Question from '../components/Question'
import QuestionsTimeline from '../components/QuestionsTimeline'
import * as utils from '../utils.js'
import Score from '../components/Score'

function WatchVideo() {
  const queryParameters = new URLSearchParams(window.location.search)
  const videoId = queryParameters.get("id")
  
  const [score, setscore] = useState(0)
  const [videoData, setVideoData] = useState(null)
  const [currentQuestionData, setCurrentQuestionData] = useState(null)
  const iframe = useRef(null);

  fetchQuestionsData();

  useEffect(() => {
    if(videoData != null){
      listenForTimeUpdate(videoData);
    }
  }, [videoData])
  
  return (
    <div id="wrapper">
      <Score newscore={score}></Score>
      <iframe ref={iframe} id="iframe" src={`https://mediaserver.htwk-leipzig.de/permalink/${videoId}/iframe`}></iframe>
      {videoData != null ? (<QuestionsTimeline id="questionsTimeline" videoData={videoData} jumpToTime={(time) => utils.jumpToTime(iframe, time)}></QuestionsTimeline>) : null}
      {displayQuestion()}
    </div>
  )

  function displayQuestion() {
    if (currentQuestionData != null) {
      utils.pauseVideo(iframe);
      return (
        <Question questionData={currentQuestionData} setQuestionData={setCurrentQuestionData} videoId={videoId} answeredCorrectly={answeredCorrectly}></Question>
      )
    }
    else {
      utils.playVideo(iframe);
      return null;
    }
}

function answeredCorrectly(){
  setscore(score+100)
}

function fetchQuestionsData() {
  useEffect(() => {
    axiosClient.get(`api/videoDatas/byVideoId/${videoId}`)
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

export default WatchVideo