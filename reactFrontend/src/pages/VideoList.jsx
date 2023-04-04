import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './css/videoList.css'
import { Link } from 'react-router-dom';

export default function VideoList() {
    const [videoList, setvideoList] = useState(null);

    const videos = videoList ? videoList.map(video => getListElement(video)) : null;

    useEffect(() => {
        getHowhyChannelVideos()
    }, [])

    return (
        <div className='videoListBody'>
            <h2>Alle Videos im Howhy-Channel: </h2>
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

    function getHowhyChannelVideos() {
        axios.get('https://mediaserver.htwk-leipzig.de/api/v2/channels/content/?parent_oid=c12663da47978macepj9&content=v')
            .then(function (response) {
                // handle success
                setvideoList(response.data.videos)
            })
    }
    return null
}
