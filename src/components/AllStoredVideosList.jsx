import React, { useEffect, useState } from 'react'
import EditorVideoList from './EditorVideoList.jsx';
import * as api from '../api.js'
import * as mediaserverApi from '../mediaserverApi.js'

export default function AllStoredVideosList({ title, getListItem }) {
  const [videoList, setvideoList] = useState([]);

  useEffect(() => {
    getVideos()
  }, [])

  return (
    videoList ? <EditorVideoList title={title} videoList={videoList} getListItem={getListItem}></EditorVideoList> : null
  )

  function getVideos() {
    api.getVideos()
      .then(response => {
        let videoIds = response.data.map(data => data.videoId)
        makeVideoList(videoIds)
      })
  }

  async function makeVideoList(videoIds) {
    // let videoDatas = []
    let responses = await Promise.all(
      videoIds.map(async id => {
        return await mediaserverApi.getVideoInfoFromMediaserver(id)
      })
    ) 
    setvideoList(responses)
  }
}
