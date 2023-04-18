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

  const iframe = useRef(null);
  const fullScreenWrapper = useRef(null);

  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!iframe.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setHeight(iframe.current.clientHeight)
    });
    resizeObserver.observe(iframe.current);
    return () => resizeObserver.disconnect(); // clean up 
  }, []);

  // Watch for fullscreenchange
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);


  fetchQuestionsData();

  function fullscreen() {
    if (!isFullscreen) {
      fullScreenWrapper.current.requestFullscreen();
      screen.orientation.lock("landscape")
      setHeight(iframe.current.clientHeight)
    } else {
      document.exitFullscreen();
    }
  }

  useEffect(() => {
    if (videoData != null) {
      listenForTimeUpdate(videoData);
    }
  }, [videoData])



  return (
    <div className={[styles.wrapper].join(' ')} >
      <Score newscore={score}></Score>
      <div ref={fullScreenWrapper} className={[styles.fullScreenWrapper, isFullscreen ? styles.fullWidthAndHeight : ''].join(' ')} style={{ height: height }}>
        <iframe ref={iframe} className={[styles.iframe, isFullscreen ? styles.fullWidthAndHeight : ''].join(' ')} src={`https://mediaserver.htwk-leipzig.de/permalink/${videoId}/iframe`}></iframe>
        {isFullscreen && (currentQuestionData != null) ? <div className={[styles.questionWrapper].join(' ')} > {displayQuestion()} </div> : null}
        <div className={[styles.fsButton].join(' ')} onClick={fullscreen}></div>
      </div>
      <div className={[styles.space].join(' ')} ></div>
      {videoData && duration != null ? (<QuestionsTimeline id="questionsTimeline" videoData={videoData} duration={duration} jumpToTime={(time) => utils.jumpToTime(iframe, time)}></QuestionsTimeline>) : null}
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
