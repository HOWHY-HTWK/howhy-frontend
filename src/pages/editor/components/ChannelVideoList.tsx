import React, { useEffect, useState } from "react"
import EditorVideoList from "./EditorVideoList"
import { getHowhyChannelVideos } from "../../../utils/api/mediaserverApi"

/**
 * Loads all Videos in the Howhy channel in the Mediaserver and displays them with the Editorvideolist.
 */
export default function ChannelVideoList({ title }) {
    const [videoList, setvideoList] = useState(null)

    useEffect(() => {
        getChannelVideos()
    }, [])

    function getChannelVideos() {
        getHowhyChannelVideos().then((response) => {
            setvideoList(response.data.videos)
        })
    }

    return (
        <EditorVideoList title={title} videoList={videoList}></EditorVideoList>
    )
}
