import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../../axios-client';

export default function AllStoredVideosList() {
  const [videoList, setvideoList] = useState([]);
  console.log(videoList)

  const videos = videoList ? videoList.map(video => getListElement(video)) : null;
  
  useEffect(() => {
    getVideos()
  }, [])

  return (
    <div className='videoListBody'>
      <h2>Alle Videos für die Daten gespeichert sind: </h2>
      {videoList ? <div className='videoListWrapper'>{videos}</div> : null}
    </div>
  )

  function getListElement(video) {
    return (
      <div className="listElement videoInList" key={video.oid}>
        <div className='vlTitle'>{video.title}</div>
        <img className='vlThumb' src={video.thumb}></img>
        <Link className='button vlEdit' to={`/editor/edit/?id=${video.oid}`}>Bearbeiten</Link>
        <Link className='button vlWatch' target="_blank" to={`/watch?id=${video.oid}`}>Ansehen</Link>
      </div>
    )
  }

  function getVideos() {
    axiosClient.get('/api/videoDatas/list/')
      .then(function (response) {
        // handle success
        makeVideoList(response.data)
      })
  }

  async function makeVideoList(videoIds) {
    let videoDatas = []
    for(let videoId of videoIds){
      videoDatas.push(await getVideoDataFromMediaserver(videoId))
    }
    setvideoList(videoDatas)

  }

  async function getVideoDataFromMediaserver(videoId) {
    return axios.get('https://mediaserver.htwk-leipzig.de/api/v2/medias/get/', { params: { oid: videoId } })
      .then(function (response) {
           return response.data.info
      })
  }
}
