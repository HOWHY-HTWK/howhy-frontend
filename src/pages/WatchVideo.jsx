import { useState, useEffect, useRef } from 'react'
import styles from './css/WatchVideo.module.css'
import Question from '../components/Question'
import QuestionsTimeline from '../components/QuestionsTimeline'
import * as utils from '../utils.js'
import Score from '../components/Score'
import * as api from '../api'
import { useStateContext } from '../contexts/ContextProvider'
import { useParams } from 'react-router-dom'
import { getRecources, getVideoInfoFromMediaserver } from '../mediaserverApi'
import HlsPlayer from '../components/HlsPlayer'
import Loader from '../components/Loader'

function WatchVideo() {
  // const queryParameters = new URLSearchParams(window.location.search)
  // const videoId = queryParameters.get("id")

  const videoId = useParams().videoId;

  const { user, setUser, updateUserData } = useStateContext()

  const [questionTimecodes, setQuestionTimecodes] = useState([])
  const [currentQuestionId, setCurrentQuestionId] = useState(null)
  const [duration, setDuration] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sources, setSources] = useState(null);

  const iframe = useRef(null);
  const fullScreenWrapper = useRef(null);
  const oldTimeRef = useRef(null);
  const timecodesRef = useRef(questionTimecodes);
  const videoRef = useRef(null)

  useEffect(() => {
    getRecources(videoId).then(response => {
      setSources(response.data)
    })
  }, [])

  useEffect(() => {
    timecodesRef.current = questionTimecodes
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
      fullScreenWrapper.current.requestFullscreen();
      screen.orientation.lock("landscape")
      document.body.style.height = "100vh";
      document.body.style.overflow = "clip";
    } else {
      document.exitFullscreen();
      document.body.style.height = "unset";
      document.body.style.overflow = "unset";
    }
    setIsFullscreen(!isFullscreen);
  }

  function displayQuestion() {
    if (currentQuestionId && videoRef.current) {
      videoRef.current.pause()
      return (
        <div className={[styles.questionWrapper, isFullscreen ? styles.questionWrapperFS : ''].join(' ')} >
          <Question
            questionId={currentQuestionId}
            setQuestionId={setCurrentQuestionId}
            videoId={videoId}
          />
        </div>
      )
    }
    else {
      videoRef.current.play()
      return null;
    }
  }

  function handleTimeUpdate(time) {
    console.log(time)
    let questionId = findQuestionId(time);
    if (questionId) {
      setCurrentQuestionId(questionId);
    }
  }

  function findQuestionId(time) {
    let question = timecodesRef.current.find(element => {
      console.log('oldtime: '+oldTimeRef.current +'  timecode: '+ element.timecode +'  time: '+ time)
      return (oldTimeRef.current <= element.timecode && element.timecode <= time) || (element.timecode == time)
    })
    oldTimeRef.current = time + 0.000001
    return question ? question.id : null
  }

  return (
    <div className={[styles.wrapper, isFullscreen ? styles.wrapperFS : ''].join(' ')} >
      <div
        ref={fullScreenWrapper}
        className={[styles.videoWrapper, isFullscreen ? styles.videoWrapperFS : ''].join(' ')}>
        <HlsPlayer
          url={`https://mediaserver.htwk-leipzig.de/api/v2/medias/playlist/?oid=${videoId}&?all`}
          timeUpdate={handleTimeUpdate}
          setDuration={setDuration}
          ref={videoRef}
        />
        <div className={[styles.fsButton].join(' ')} onClick={fullscreen}></div>
      </div>
      {videoRef.current ? displayQuestion() : null}
      {questionTimecodes && duration ?
        <div className={[styles.timeline, isFullscreen ? styles.timelineFS : ''].join(' ')}  >
          <QuestionsTimeline
            className={[styles.timeline, isFullscreen ? styles.timelineFS : ''].join(' ')}
            questionTimecodes={questionTimecodes}
            duration={duration}
            jumpToTime={(time) => { videoRef.current.currentTime = time }} />
        </div> : <Loader></Loader>}
    </div >
  )

}

export default WatchVideo
