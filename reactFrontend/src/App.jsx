import { useState, useEffect } from 'react'
import axiosClient from '../axios-client'
import './App.css'
import QuestionBox from './components/Question'
import QuestionsTimeline from './components/QuestionsTimeline'

function App() {
  const [videoData, setVideoData] = useState(null)
  const [userAnswer, setUserAnswer] = useState(null);
  const [jumpToTime, setTime] = useState(null);
  const [timecodes, setTimecodes] = useState([])
  var allVideoData = null;
  fetchQuestionsData();

  useEffect(() => {
    processAnswer()
  }, [userAnswer]);

  useEffect(() => {
    iframe.contentWindow.postMessage({ 'seek': jumpToTime }, '*');
  }, [jumpToTime])

  // useEffect(() => {
  //   listenForTimeUpdate(timecodes);
  // }, [timecodes])

  return (
    <div id="wrapper">
      <iframe id="iframe" src="https://mediaserver.htwk-leipzig.de/permalink/v12663c723847flqwp36/iframe"></iframe>
      {timecodes != null ? (<QuestionsTimeline id="questionsTimeline" timecodes={timecodes} setTime={setTime}></QuestionsTimeline>) : null}
      {displayQuestion()}
    </div>
  )

  function processAnswer() {
    //TODO get feedback
    if (userAnswer != null) {
      setVideoData(null)
      setUserAnswer(null)
      fkt_play()
    }
  }

  function displayQuestion() {
    if (videoData != null) {
      fkt_pause();
      return (
        <QuestionBox questionData={videoData} setUserAnswer={setUserAnswer}></QuestionBox>
      );
    }
    return null;
  }

  function fetchQuestionsData() {
    useEffect(() => {
      axiosClient.get("videoDatas/8")
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
        console.log('New player time:', event.data.time);
        setQuestion(event.data.time, localtimecodes);
      } else if ('state' in event.data) {
        console.log('New player state:', event.data.state)
      } else if ('duration' in event.data) {
        console.log('New player duration:', event.data.duration)
      }
    }, false)
  }

  function setQuestion(time, localtimecodes) {
    for (let step = 0; step < localtimecodes.length; step++) {
      if (Math.floor(time) == localtimecodes[step]) {
        //Die Frage mit dem entsprechenden Index wird angezeigt
        setVideoData(allVideoData.data[step]);
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
