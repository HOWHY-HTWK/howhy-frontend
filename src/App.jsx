import { useState, useEffect, useRef } from 'react'
import axiosClient from '../axios-client'
import './App.css'
import WatchVideo from './pages/WatchVideo'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import UserMenu from './components/UserMenu'
import LogIn from './components/LogIn'

function App() {
  const [loginActive, setLoginActive] = useState(false)

  return !loginActive ? 
    <div className={['pageWrap'].join(' ')} >
      <Header><UserMenu setLoginActive={setLoginActive} /></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  :
  <LogIn returnSuccess={success => setLoginActive(!success)}></LogIn>
}

export default App
