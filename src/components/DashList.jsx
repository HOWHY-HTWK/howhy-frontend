import React, { useEffect, useState } from 'react'
import EditorVideoList from './EditorVideoList'
import AllStoredVideosList from './AllStoredVideosList'
import videoListStyles from './css/VideoList.module.css'
import styles from './css/Dashlist.module.css'
import { Link, NavLink } from 'react-router-dom'
import * as api from '../api.js'
import * as mediaserverApi from '../mediaserverApi.js'

export default function DashList() {
  const [videoList, setvideoList] = useState([]);
  const videos = videoList ? videoList.map(video => getListItem(video)) : null

  useEffect(() => {
    getVideos()
  }, [])

  return (
    <div className={[styles.wrap, 'center'].join(' ')} >
      {videoList ? <div className={[].join(' ')} >{videos}</div> : null}
    </div>
  )

  function getListItem(video) {
    return (
      <NavLink className={[styles.listItem].join(' ')} key={video.oid} to={`/watch/?id=${video.oid}`}>
        <img className={[styles.img].join(' ')} src={video.thumb}></img>
        <div className={[styles.title].join(' ')} >{video.title}</div>
        <div className={[styles.statsWrap].join(' ')} >
          <div className={[styles.stats].join(' ')} >{video.success.correctCount + ' / ' + video.success.questionCount}</div>
        </div>
      </NavLink>
    )
  }

  function getVideos() {
    api.getVideos()
      .then(response => {
        makeVideoList(response.data)
      })
  }

  async function makeVideoList(videos) {
    let videoList = await Promise.all(
      videos.map(async video => {
        let videoWithData = await mediaserverApi.getVideoInfoFromMediaserver(video.videoId)
        videoWithData.success = video.success;
        return videoWithData;
      })
    )
    setvideoList(videoList)
  }
}
