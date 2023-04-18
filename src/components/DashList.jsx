import React from 'react'
import EditorVideoList from './EditorVideoList'
import AllStoredVideosList from './AllStoredVideosList'
import videoListStyles from './css/VideoList.module.css'
import styles from './css/Dashlist.module.css'
import { Link } from 'react-router-dom'

export default function DashList() {
  return (

    <div className={[styles.wrap].join(' ')} >
      <AllStoredVideosList title={<div></div>} getListItem={getListItem}></AllStoredVideosList>
    </div>
  )

  function getListItem(video) {
    return (
      <Link className={[styles.listItem].join(' ')} key={video.oid} to={`/watch/?id=${video.oid}`}>
        <img className={[styles.img].join(' ')} src={video.thumb}></img>
        <div className={[styles.title].join(' ')} >{video.title}</div>
      </Link>
    )
  }
}
