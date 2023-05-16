import { useRef, useState } from 'react'
import styles from './App.module.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import UserMenu from './components/UserMenu'
import LogIn from './components/LogIn'

function App() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const [loginActive, setLoginActive] = useState(true)
  const [frame, setFrame] = useState(determinIfSmartphone(windowSize.current));
  
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

  return (
    <div className={[frame ? styles.phone : styles.phoneOff].join(' ')} >
      {!loginActive ?
      <div className={['pageWrap'].join(' ')} >
        <Header><UserMenu setLoginActive={setLoginActive} /></Header>
        <Outlet />
        <Footer></Footer>
      </div>
      :
      <LogIn returnSuccess={success => setLoginActive(!success)}></LogIn>}
      <div className={[styles.toggle].join(' ')} onClick={toggleFrame}>Toggle Frame</div>

    </div>
  )
}

export default App
