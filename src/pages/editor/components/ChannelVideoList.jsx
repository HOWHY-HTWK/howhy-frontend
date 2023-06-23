import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EditorVideoList from './EditorVideoList';
import { getHowhyChannelVideos } from 'src/utils/api/mediaserverApi';

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
