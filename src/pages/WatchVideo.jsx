import { useState, useEffect, useRef } from 'react'
import axiosClient from '../../axios-client'
import styles from './css/WatchVideo.module.css'
import Question from '../components/Question'
import QuestionsTimeline from '../components/QuestionsTimeline'
import * as utils from '../utils.js'
import Score from '../components/Score'
import * as api from '../api'

function WatchVideo() {
  const queryParameters = new URLSearchParams(window.location.search)
  const videoId = queryParameters.get("id")

  const [score, setscore] = useState(0)
  const [questionTimecodes, setQuestionTimecodes] = useState([])
  const [currentQuestionId, setCurrentQuestionId] = useState(null)
  const [duration, setDuration] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false);

  const iframe = useRef(null);
  const fullScreenWrapper = useRef(null);

  useEffect(() => {
    api.getQuestionTimecodes(videoId).then(response => {
      setQuestionTimecodes(response.data)
    })
  }, [])

  questionTimecodes ? listenForTimeUpdate(questionTimecodes) : null

  function fullscreen() {
    if (!isFullscreen) {
      // fullScreenWrapper.current.requestFullscreen();
      // screen.orientation.lock("landscape")
      document.body.style.height = "100vh";
      document.body.style.overflow = "clip";
    } else {
      // document.exitFullscreen();
      document.body.style.height = "unset";
      document.body.style.overflow = "unset";
    }
    setIsFullscreen(!isFullscreen);
  }

  return (
    <div className={[styles.wrapper, isFullscreen ? styles.wrapperFS : ''].join(' ')} >
      <div ref={fullScreenWrapper} className={[styles.videoWrapper, isFullscreen ? styles.videoWrapperFS : ''].join(' ')}>
        <iframe ref={iframe}
          className={[styles.iframe, isFullscreen ? styles.iframeFS : ''].join(' ')}
          src={`https://mediaserver.htwk-leipzig.de/permalink/${videoId}/iframe`}></iframe>
        <div className={[styles.fsButton].join(' ')} onClick={fullscreen}></div>
      </div>
      <div className={[styles.score, isFullscreen ? styles.scoreFS : ''].join(' ')}>
        <Score newscore={score}></Score>
      </div>
      {displayQuestion()}
      {questionTimecodes && duration != null ? (
        <div className={[styles.timeline, isFullscreen ? styles.timelineFS : ''].join(' ')}  >
          <QuestionsTimeline
            className={[styles.timeline, isFullscreen ? styles.timelineFS : ''].join(' ')}
            questionTimecodes={questionTimecodes}
            duration={duration}
            jumpToTime={(time) => utils.jumpToTime(iframe, time)} />
        </div>) : null}
    </div >
  )

  function displayQuestion() {
    if (currentQuestionId) {
      utils.pauseVideo(iframe);
      return (
        <div className={[styles.questionWrapper, isFullscreen ? styles.questionWrapperFS : ''].join(' ')} >
          <Question questionId={currentQuestionId} setQuestionId={setCurrentQuestionId} videoId={videoId} answeredCorrectly={answeredCorrectly}></Question>
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

  function listenForTimeUpdate(questionTimecodes) {
    window.addEventListener('message', function (event) {
      if ('time' in event.data) {
        let questionId = findQuestionId(event.data.time, questionTimecodes);
        if (questionId) {
          setCurrentQuestionId(questionId);
        }
      } else if ('state' in event.data) {
      } else if ('duration' in event.data) {
        if (!duration) {
          setDuration(event.data.duration)
        }
      }
    }, false)
  }

  function findQuestionId(time, timecodes) {
    return timecodes.find(element => element.timecode == time).id
  }
  
}

export default WatchVideo
