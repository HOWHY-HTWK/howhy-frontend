import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axiosClient from '../axios-client'
import './App.css'
import Question from './components/Question'

function App() {
  const [videoData, setVideoData] = useState('')

  
  useEffect(() => { axiosClient.get("videoDatas/8").then((response) => {
      setVideoData(response.data);
      console.log(JSON.stringify(response.data));
    });
  }, []);

  return (
    <>
    <div id="videoframe">
      {/* <iframe id="iframe" src="https://mediaserver.htwk-leipzig.de/permalink/v12663c723847flqwp36/iframe/#start=30"></iframe> */}
      <div id="question_div"></div>
    </div>
    <Question questionData={videoData.data}></Question>
    </>
  )
}

export default App
