import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EditorVideoList from './EditorVideoList';

export default function ChannelVideoList({title, getListItem}) {
    const [videoList, setvideoList] = useState(null);

    useEffect(() => {
        getHowhyChannelVideos()
    }, [])

    return (
        <EditorVideoList title={title} videoList={videoList} getListItem={getListItem}></EditorVideoList>
    )

    function getHowhyChannelVideos() {
        axios.get('https://mediaserver.htwk-leipzig.de/api/v2/channels/content/?parent_oid=c12663da47978macepj9&content=v')
            .then(function (response) {
                // handle success
                setvideoList(response.data.videos)
            })
    }
}
