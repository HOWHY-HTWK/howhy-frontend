import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axiosClient from '../axios-client'
import './App.css'
import QuestionBox from './components/Question'
import QuestionsTimeline from './components/QuestionsTimeline'

function App() {
  const [videoData, setVideoData] = useState(null)
  const [userAnswer, setUserAnswer] = useState(null);
  var allVideoData = null;
  var timecodes = [];
  fetchQuestionsData();
  listenForTimeUpdate();
  
  useEffect(() => {
    processAnswer()
  }, [userAnswer]);

  return (
    <div id="wrapper">
        <iframe id="iframe" src="https://mediaserver.htwk-leipzig.de/permalink/v12663c723847flqwp36/iframe"></iframe>
        <QuestionsTimeline id="questionsTimeline"></QuestionsTimeline>
      {displayQuestion()}
    </div>
  )

  function processAnswer() {
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
    timecodes = [];
    for (let step = 0; step < questions.length; step++) {
      timecodes.push(questions[step].timecode)
    }
        //Das Anzeigen der Fragen wird gestartet 
    listenForTimeUpdate();
    
  }

  function listenForTimeUpdate() {
    window.addEventListener('message', function (event) {
      // Check that the message comes from the player iframe.
      // Handle event data.
      if ('time' in event.data) {
        console.log('New player time:', event.data.time)
        setQuestions(event.data.time);
      } else if ('state' in event.data) {
        console.log('New player state:', event.data.state)
      } else if ('duration' in event.data) {
        console.log('New player duration:', event.data.duration)
      }
    }, false)
  }

  function setQuestions(time) {
    for (let step = 0; step < timecodes.length; step++) {
      if (Math.floor(time) == timecodes[step]) {
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
