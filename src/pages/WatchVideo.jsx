import { useState, useEffect, useRef } from 'react'
import axiosClient from '../../axios-client'
import styles from './css/WatchVideo.module.css'
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
  const [duration, setDuration] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [height, setHeight] = useState(0)

  const iframe = useRef(null);
  const fullScreenWrapper = useRef(null);

  fetchQuestionsData();

  function fullscreen() {
    if (!isFullscreen) {
      // fullScreenWrapper.current.requestFullscreen();
      // screen.orientation.lock("landscape")
      document.body.style.height = "100vh";
      document.body.style.overflow = "clip";
      setHeight(iframe.current.clientHeight)
    } else {
      // document.exitFullscreen();
      document.body.style.height = "unset";
      document.body.style.overflow = "unset";
    }
    setIsFullscreen(!isFullscreen);
  }

  useEffect(() => {
    if (videoData != null) {
      listenForTimeUpdate(videoData);
    }
  }, [videoData])

  return (
    <div className={[styles.wrapper, isFullscreen ? styles.wrapperFS : ''].join(' ')} >
      <div ref={fullScreenWrapper} className={[styles.videoWrapper, isFullscreen ? styles.videoWrapperFS : ''].join(' ')}>
        <iframe ref={iframe} className={[styles.iframe, isFullscreen ? styles.iframeFS : ''].join(' ')} src={`https://mediaserver.htwk-leipzig.de/permalink/${videoId}/iframe`}></iframe>
        <div className={[styles.fsButton].join(' ')} onClick={fullscreen}></div>
      </div>
      <div className={[styles.score, isFullscreen ? styles.scoreFS : ''].join(' ')}>
        <Score newscore={score}></Score>
      </div>
      {displayQuestion()}
      {videoData && duration != null ? (<div className={[styles.timeline, isFullscreen ? styles.timelineFS : ''].join(' ')}  ><QuestionsTimeline className={[styles.timeline, isFullscreen ? styles.timelineFS : ''].join(' ')} videoData={videoData} duration={duration} jumpToTime={(time) => utils.jumpToTime(iframe, time)}></QuestionsTimeline></div>) : null}
    </div >
  )

  function displayQuestion() {
    if (currentQuestionData) {
      utils.pauseVideo(iframe);
      return (
        <div className={[styles.questionWrapper, isFullscreen ? styles.questionWrapperFS : ''].join(' ')} >
          <Question questionData={currentQuestionData} setQuestionData={setCurrentQuestionData} videoId={videoId} answeredCorrectly={answeredCorrectly}></Question>
        </div>
      )
    }
    else {
      utils.playVideo(iframe);
      return null;
    }
  }

  function answeredCorrectly() {
    setscore(score + 100)
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
        if (questionIndex != null) {
          let tempQuestionData = videoData.data[questionIndex]
          tempQuestionData.index = questionIndex;
          setCurrentQuestionData(tempQuestionData);
        }
      } else if ('state' in event.data) {
      } else if ('duration' in event.data) {
        if (!duration) {
          setDuration(event.data.duration)
        }
      }
    }, false)
  }
}

export default WatchVideo
