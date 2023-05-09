import React, { useEffect } from 'react'
import ChannelVideoList from '../components/ChannelVideoList'
import AllStoredVideosList from '../components/AllStoredVideosList'
import AddVideo from '../components/AddVideo'
import styles from './css/EditorDash.module.css'
import videoListStyles from '../components/css/VideoList.module.css'
import { Link } from 'react-router-dom'

export default function EditorDash() {
  useEffect(() => {
    document.title = "Dashboard";
  }, [])
  return (
    <div className={[styles.wrap].join(' ')} >
      <AllStoredVideosList title={<h2>Alle Videos für die Daten gespeichert sind: </h2>} getListItem={getListItem} />
      <ChannelVideoList title={<h2>Alle Videos im Howhy Channel: </h2>} getListItem={getListItem} />
      <div className={[styles.addVideo].join(' ')} ><AddVideo /></div>
    </div >
  )

  function getListItem(video) {
    return (
      <div className={[videoListStyles.videoInList, 'listElement'].join(' ')} key={video.oid}>
        <div className={[videoListStyles.Title].join(' ')} >{video.title}</div>
        <img className={[videoListStyles.Thumb].join(' ')} src={video.thumb}></img>
        <div className={[videoListStyles.buttonWrap].join(' ')} >
          <Link className={['button'].join(' ')} to={`/editor/edit/?id=${video.oid}`}>Bearbeiten</Link>
          <Link className={['button'].join(' ')} target="_blank" to={`/watch?id=${video.oid}`}>Ansehen</Link>
        </div>
      </div>
    )
  }
}




