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
      <AllStoredVideosList title={<h2>Alle Videos für die Daten gespeichert sind: </h2>} />
      <ChannelVideoList title={<h2>Alle Videos im Howhy Channel: </h2>} />
      <div className={[styles.addVideo].join(' ')} ><AddVideo /></div>
    </div >
  )
}




