import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../../axios-client';
import styles from './css/VideoList.module.css'
import EditorVideoList from './EditorVideoList.jsx';

export default function AllStoredVideosList({title, getListItem }) {
  const [videoList, setvideoList] = useState(null);

  useEffect(() => {
    getVideos()
  }, [])

  return (
    videoList ? <EditorVideoList title={title} videoList={videoList} getListItem={getListItem}></EditorVideoList>: null
  )

  function getVideos() {
    axiosClient.get('/api/videoDatas/all/')
      .then(function (response) {
        // handle success
        makeVideoList(response.data)
      })
  }

  async function makeVideoList(videoIds) {
    let videoDatas = []
    for (let videoId of videoIds) {
      videoDatas.push(await getVideoDataFromMediaserver(videoId))
      let videoData = await getVideoDataFromMediaserver(videoId)
      setvideoList([...videoDatas], videoData)

    }
  }

  async function getVideoDataFromMediaserver(videoId) {
    return axios.get('https://mediaserver.htwk-leipzig.de/api/v2/medias/get/', { params: { oid: videoId } })
      .then(function (response) {
        return response.data.info
      })
  }
}
