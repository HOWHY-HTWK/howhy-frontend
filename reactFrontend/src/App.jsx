import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="videoframe">
      <iframe id="iframe" src="https://mediaserver.htwk-leipzig.de/permalink/v12663c723847flqwp36/iframe/#start=30" frameborder="0" allowfullscreen
        onLoad="iframeDidLoad();"></iframe>
      <div id="question_div"></div>
    </div>
  )
}

export default App
