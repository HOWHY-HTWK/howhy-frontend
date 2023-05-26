import React, { useEffect, useState } from 'react'
import styles from './css/Dashlist.module.css'
import { Link, NavLink } from 'react-router-dom'
import * as api from '../api.js'
import * as mediaserverApi from '../mediaserverApi.js'

export default function DashList({ searchterm = ''}) {
  const [videoList, setvideoList] = useState([]);

  const filteredList = filterList(videoList);
  const videos = videoList ? filteredList.map(video => getListItem(video)) : null

  useEffect(() => {
    getVideos()
  }, [])

  function filterList(list) {
    return list.filter(item => {
      return (
        item
          .title
          .toString()
          .toLowerCase()
          .includes(searchterm.toLowerCase()) ||
        item
          .speaker
          .toLowerCase()
          .includes(searchterm.toLowerCase())
      );
    })
  }

  function getListItem(video) {
    return (
      <NavLink className={[styles.listItem, 'listElement'].join(' ')} key={video.oid} to={`/watch/?id=${video.oid}`}>
        <img className={[styles.img].join(' ')} src={video.thumb}></img>
        <div className={[styles.title, styles.item].join(' ')} >{video.title}</div>
        <div className={[styles.statsWrap, styles.item].join(' ')} >
          <div className={[styles.stats, getBackground(video.success)].join(' ')} >{video.success.correctCount + ' / ' + video.success.questionCount}</div>
        </div>
        <div className={[styles.points, styles.item].join(' ')} >300 Points</div>
        <div className={[styles.views, styles.item].join(' ')} >20 Views</div>
      </NavLink>
    )
  }

  function getBackground(success) {
    if (success.correctCount == success.questionCount) {
      return styles.all
    }
    if (success.correctCount > 0) {
      return styles.partly
    }
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

  return (
    <div className={[styles.wrap, 'center'].join(' ')} >
      {videoList ? videos : null}
    </div>
  )
}
