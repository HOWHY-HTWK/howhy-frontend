import { useState, useEffect } from 'react'
import axiosClient from '../axios-client'
import './App.css'
import QuestionBox from './components/Question'
import QuestionsTimeline from './components/QuestionsTimeline'

function App() {
  const [videoData, setVideoData] = useState(null)
  const [timecodes, setTimecodes] = useState([])
  const [answerCorrect, setAnswerCorrect] = useState(null);
  const videoId = 456;

  var allVideoData = null;

  fetchQuestionsData();

  return (
    <div id="wrapper">
      <iframe id="iframe" src="https://mediaserver.htwk-leipzig.de/permalink/v12663c723847flqwp36/iframe"></iframe>
      {timecodes != null ? (<QuestionsTimeline id="questionsTimeline" timecodes={timecodes} jumpToTime={jumpToTime}></QuestionsTimeline>) : null}
      {displayQuestion()}
      {answerFeedback()}
    </div>
  )

  function jumpToTime(time) {
    iframe.contentWindow.postMessage({ 'seek': time }, '*');
  }

  function processAnswer(answer) {
    //TODO get feedback
    if (answer != []) {
      var request = {
        "questionIndex": videoData.index,
        "answers": answer
      }
      axiosClient.post(`videoDatas/checkAnswers/${videoId}`, request )
        .then((response) => {
          setVideoData(null)
          setAnswerCorrect(response.data.success)
          setTimeout(function() {
            setAnswerCorrect(null)
          }, 1000);
          fkt_play()
        })
    }
  }

  function answerFeedback(){
    if(answerCorrect != null){
      return (
        <div>{answerCorrect ? "Richtig!" : "Leider Falsch"}</div>
        )
    }
  }

  function displayQuestion() {
    if (videoData != null) {
      fkt_pause();
      return (
        <QuestionBox questionData={videoData} setUserAnswer={processAnswer}></QuestionBox>
      );
    }
    return null;
  }

  function fetchQuestionsData() {
    useEffect(() => {
      axiosClient.get(`videoDatas/byVideoId/${videoId}`)
        .then((response) => {
          allVideoData = response.data;
          makeTimecodesList(response.data.data);
        })
    }, [])
  }

  function makeTimecodesList(questions) {
    let localtimecodes = [];
    for (let step = 0; step < questions.length; step++) {
      localtimecodes.push(questions[step].timecode)
    }
    //Das Anzeigen der Fragen wird gestartet 
    listenForTimeUpdate(localtimecodes);
    setTimecodes(localtimecodes);
  }

  function listenForTimeUpdate(localtimecodes) {
    window.addEventListener('message', function (event) {
      // Check that the message comes from the player iframe.
      // Handle event data.
      if ('time' in event.data) {
        // console.log('New player time:', event.data.time);
        setQuestion(event.data.time, localtimecodes);
      } else if ('state' in event.data) {
        // console.log('New player state:', event.data.state)
      } else if ('duration' in event.data) {
        // console.log('New player duration:', event.data.duration)
      }
    }, false)
  }

  function setQuestion(time, localtimecodes) {
    for (let step = 0; step < localtimecodes.length; step++) {
      if (Math.floor(time) == localtimecodes[step]) {
        //Die Frage mit dem entsprechenden Index wird angezeigt
        var videoData = allVideoData.data[step]
        videoData.index = step;
        setVideoData(videoData);
      }
    }
  }

  function fkt_play() {
    iframe.contentWindow.postMessage('play', '*');
  }
  function fkt_pause() {
    iframe.contentWindow.postMessage('pause', '*');
  }


}

export default App
