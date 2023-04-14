import React, { useEffect } from 'react'
import ChannelVideoList from './ChannelVideoList'
import AllStoredVideosList from '../components/AllStoredVideosList'
import AddVideo from '../components/AddVideo'
import './css/editorDash.css'

export default function EditorDash() {
  useEffect(() => {
    document.title = "Dashboard";
}, [])
  return (
    <div className='EDWrap'>
        <ChannelVideoList/>
        <AllStoredVideosList />
      <div className='addVideo'><AddVideo/></div>

    </div >
  )
}
