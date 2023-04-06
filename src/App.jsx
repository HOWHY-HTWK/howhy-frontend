import { useState, useEffect, useRef } from 'react'
import axiosClient from '../axios-client'
import './App.css'
import WatchVideo from './pages/WatchVideo'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <Outlet/>
  )
}

export default App
