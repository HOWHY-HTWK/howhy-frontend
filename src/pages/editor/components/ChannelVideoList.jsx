import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EditorVideoList from './EditorVideoList';
import { getHowhyChannelVideos } from 'src/utils/api/mediaserverApi';

/**
 * Loads all Videos in the Howhy channel in the Mediaserver and displays them with the Editorvideolist.
 * @param {string} title 
 * @returns 
 */
export default function ChannelVideoList({ title }) {
    const [videoList, setvideoList] = useState(null);

    useEffect(() => {
        getChannelVideos()
    }, [])

    function getChannelVideos() {
        getHowhyChannelVideos().then(response => {
            setvideoList(response.data.videos)
        })
    }

    return (
        <EditorVideoList title={title} videoList={videoList}></EditorVideoList>
    )
}
