import { useEffect, useReducer, useRef, useState } from 'react'
import styles from './App.module.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import UserMenu from './components/UserMenu'
import UserLogin from './components/UserLogin'
import { useStateContext } from './contexts/ContextProvider'

function App() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const [loginActive, setLoginActive] = useState(false)
  const [frame, setFrame] = useState(determinIfSmartphone(windowSize.current));

  return (
    <div className={[frame ? styles.phone : styles.phoneOff].join(' ')} >
      {!loginActive ?
      <div className={['pageWrap'].join(' ')} >
        <Header><UserMenu setLoginActive={setLoginActive} /></Header>
        <Outlet />
        <Footer></Footer>
      </div>
      :
      <UserLogin returnSuccess={success => setLoginActive(!success)} />}
      <div className={[styles.toggle].join(' ')} onClick={toggleFrame}>Toggle Frame</div>

    </div>
  )
  
  function toggleFrame() {
    setFrame(prev => !prev)
  }

  function determinIfSmartphone(windowSize) {
    if (windowSize[0] < 1000) {
      return false
    } else {
      return true
    }
  }
}

export default App
