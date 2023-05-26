import { useState, useEffect, useRef } from 'react'
import styles from './css/WatchVideo.module.css'
import Question from '../components/Question'
import QuestionsTimeline from '../components/QuestionsTimeline'
import * as utils from '../utils.js'
import Score from '../components/Score'
import * as api from '../api'
import { useStateContext } from '../contexts/ContextProvider'

function WatchVideo() {
  const queryParameters = new URLSearchParams(window.location.search)
  const videoId = queryParameters.get("id")

  const { user, setUser, updateUserData } = useStateContext()

  const [questionTimecodes, setQuestionTimecodes] = useState([])
  const [currentQuestionId, setCurrentQuestionId] = useState(null)
  const [duration, setDuration] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false);

  const iframe = useRef(null);
  const fullScreenWrapper = useRef(null);

  useEffect(() => {
    window.removeEventListener('message', handlePlayerEvent, false)
    window.addEventListener('message', handlePlayerEvent, false)
    return () => {
      window.removeEventListener('message', handlePlayerEvent, false)
    };
  }, [questionTimecodes]);

  useEffect(() => {
    getTimecodes()
    updateUserData()
  }, [currentQuestionId])

  function getTimecodes() {
    api.getQuestionTimecodes(videoId).then(response => {
      setQuestionTimecodes(response.data)
    })
  }

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

  function displayQuestion() {
    if (currentQuestionId) {
      utils.pauseVideo(iframe);
      return (
        <div className={[styles.questionWrapper, isFullscreen ? styles.questionWrapperFS : ''].join(' ')} >
          <Question questionId={currentQuestionId} setQuestionId={setCurrentQuestionId} videoId={videoId}></Question>
        </div>
      )
    }
    else {
      utils.playVideo(iframe);
      return null;
    }
  }

  function handlePlayerEvent(event) {
    if ('time' in event.data) {
      let questionId = findQuestionId(event.data.time);
      if (questionId) {
        setCurrentQuestionId(questionId);
      }
    } else if ('state' in event.data) {
    } else if ('duration' in event.data) {
      if (!duration) {
        setDuration(event.data.duration)
      }
    }
  }

  function findQuestionId(time) {
    let question = questionTimecodes.find(element => {
      return element.timecode == time
    })
    return question ? question.id : null
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
      </div>
      {displayQuestion()}
      {questionTimecodes && duration ? (
        <div className={[styles.timeline, isFullscreen ? styles.timelineFS : ''].join(' ')}  >
          <QuestionsTimeline
            className={[styles.timeline, isFullscreen ? styles.timelineFS : ''].join(' ')}
            questionTimecodes={questionTimecodes}
            duration={duration}
            jumpToTime={(time) => utils.jumpToTime(iframe, time)} />
        </div>) : null}
    </div >
  )

}

export default WatchVideo
