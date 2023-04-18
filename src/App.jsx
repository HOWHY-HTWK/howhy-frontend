import { useState, useEffect, useRef } from 'react'
import axiosClient from '../axios-client'
import './App.css'
import WatchVideo from './pages/WatchVideo'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className={['pageWrap'].join(' ')} >
      <Header></Header>
      <Outlet/>
      <Footer></Footer>
    </div>
  )
}

export default App
