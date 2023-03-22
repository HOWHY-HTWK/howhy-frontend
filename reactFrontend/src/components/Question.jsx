import React, { useState, useEffect } from 'react'
import './questions.css'


export default function Question(props) {
  const [videoData, setVideoData] = useState('')

  useEffect(() => { 
    setVideoData(props);
    
}, []);

  return (
      <div id="question">
    <div id="questionText"> {videoData.question}</div>
    <div id="question_wrapper"></div>
    <div id="answerbuttonWrapper">
      <div id="answerbutton">Antwort abschicken</div>
    </div>
  </div>

  )
}
