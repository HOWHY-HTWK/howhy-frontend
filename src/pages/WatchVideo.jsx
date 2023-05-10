import { useState, useEffect, useRef } from 'react'
import styles from './css/WatchVideo.module.css'
import Question from '../components/Question'
import QuestionsTimeline from '../components/QuestionsTimeline'
import * as utils from '../utils.js'
import Score from '../components/Score'
import * as api from '../api'
import { getRecources, getVideoInfoFromMediaserver } from '../mediaserverApi'
import Player from '../components/Player'

function WatchVideo() {
  const queryParameters = new URLSearchParams(window.location.search)
  const videoId = queryParameters.get("id")

  const [score, setScore] = useState(null)
  const [questionTimecodes, setQuestionTimecodes] = useState([])
  const [currentQuestionId, setCurrentQuestionId] = useState(null)
  const [duration, setDuration] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false);

  const iframe = useRef(null);
  const fullScreenWrapper = useRef(null);
  const playerRef = useRef(null);


  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: getSources(videoId)
  };

  useEffect(() => {
    window.removeEventListener('message', handlePlayerEvent, false)
    window.addEventListener('message', handlePlayerEvent, false)
    return () => {
      window.removeEventListener('message', handlePlayerEvent, false)
    };
  }, [questionTimecodes]);

  useEffect(() => {
    getTimecodes()
    getUserScore()
  }, [currentQuestionId])

  function getUserScore() {
    api.score().then(response => {
      setScore(response.data.score);
    })
  }

  function getSources(videoId){
    return getRecources(videoId)
  }

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

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <div className={[styles.wrapper, isFullscreen ? styles.wrapperFS : ''].join(' ')} >
      <div ref={fullScreenWrapper} className={[styles.videoWrapper, isFullscreen ? styles.videoWrapperFS : ''].join(' ')}>
        {/* <iframe ref={iframe}
          className={[styles.iframe, isFullscreen ? styles.iframeFS : ''].join(' ')}
          src={`https://mediaserver.htwk-leipzig.de/permalink/${videoId}/iframe`}></iframe> */}
        <Player options={videoJsOptions} onReady={handlePlayerReady} className={[styles.iframe, isFullscreen ? styles.iframeFS : ''].join(' ')}></Player>
        <div className={[styles.fsButton].join(' ')} onClick={fullscreen}></div>
      </div>
      <div className={[styles.score, isFullscreen ? styles.scoreFS : ''].join(' ')}>
        {score != null ? <Score newscore={score}></Score> : null}
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

}

export default WatchVideo
