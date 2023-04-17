import React, { useEffect } from 'react'
import ChannelVideoList from '../components/ChannelVideoList'
import AllStoredVideosList from '../components/AllStoredVideosList'
import AddVideo from '../components/AddVideo'
import styles from './css/EditorDash.module.css'

export default function EditorDash() {
  useEffect(() => {
    document.title = "Dashboard";
}, [])
  return (
    <div className={[styles.wrap].join(' ')} >
        <AllStoredVideosList />
        <ChannelVideoList/>
      <div className={[styles.addVideo].join(' ')} ><AddVideo/></div>

    </div >
  )
}
