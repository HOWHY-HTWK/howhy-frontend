import React, { useEffect, useState } from 'react'
import EditorVideoList from './EditorVideoList.jsx';
import * as api from 'src/utils/api/api.js'
import * as mediaserverApi from 'src/utils/api/mediaserverApi.js'

/**
 * Shows a List of all Videos on the Platform. It loads the videolist from the api and passes it to the EditorVideoList 
 * Component which renders the List.
 * 
 * @param {string} title 
 * @returns 
 */
export default function AllStoredVideosList({ title }) {
    const [videoList, setvideoList] = useState([]);

    useEffect(() => {
        getVideos()
    }, [])

    function getVideos() {
        api.getVideos()
            .then(response => {
                let videoIds = response.data.map(data => data.videoId)
                makeVideoList(videoIds)
            })
    }

    async function makeVideoList(videoIds) {
        let videoList = await Promise.all(
            videoIds.map(async id => {
                let videoWithData = await mediaserverApi.getVideoInfoFromMediaserver(id)
                return videoWithData;
            })
        )
        let listWithoutNull = videoList.filter(item => item !== null)
        setvideoList(listWithoutNull)
    }

    return (
        videoList ? <EditorVideoList title={title} videoList={videoList}></EditorVideoList> : null
    )
}