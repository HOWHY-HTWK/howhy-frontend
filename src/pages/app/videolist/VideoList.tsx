import React, { useState } from "react"
import styles from "./VideoList.module.css"
import Loader from "../../shared/components/Loader"
import { useVideoList, Video } from "./useVideoList"
import { VideoListItem } from "./VideoListItem"
import { InputAdornment } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { HowhyTextField } from "../components/HowhyTextField"

/**
 * The List of videos that is displayed in the "Videos Tab"
 */
export const VideoList = () => {
    const [filter, setFilter] = useState("")
    const { videoList, isLoading, error } = useVideoList()

    function constructVideoList() {
        return videoList
            .filter(byTitleAndSpeaker(filter))
            .map((video) => <VideoListItem key={video.oid} video={video} />)
    }

    return (
        <div className={[styles.videoList, "center"].join(" ")}>
            <HowhyTextField
                sx={{ marginBottom: 2, width: "100%" }}
                label={"Suche"}
                onChange={(event) => setFilter(event.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
            {isLoading ? <Loader /> : constructVideoList()}
        </div>
    )
}

function byTitleAndSpeaker(filter: string) {
    return (item: Video) => {
        return (
            item.title
                .toString()
                .toLowerCase()
                .includes(filter.toLowerCase()) ||
            item.speaker.toLowerCase().includes(filter.toLowerCase())
        )
    }
}
