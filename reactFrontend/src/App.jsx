import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axiosClient from '../axios-client'
import './App.css'

function App() {
  const [videoData, setVideoData] = useState(null)

  
    axiosClient.get("videoDatas").then((response) => {
      setVideoData(response.data);
    });


  return (
    <>
    <div id="videoframe">
      <iframe id="iframe" src="https://mediaserver.htwk-leipzig.de/permalink/v12663c723847flqwp36/iframe/#start=30"></iframe>
      <div id="question_div"></div>
    </div>
    <div>{videoData}</div>
    </>
  )
}

export default App
