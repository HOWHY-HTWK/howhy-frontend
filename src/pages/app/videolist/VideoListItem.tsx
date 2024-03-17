import { Link } from "react-router-dom"
import styles from "./VideoList.module.css"
import React from "react"
import { Video } from "./useVideoList"

interface VideoListItemProps {
    video: Video
}

export const VideoListItem = ({ video }: VideoListItemProps) => {
    return (
        <Link
            className={[styles.listItem, "listElement"].join(" ")}
            key={video.oid}
            to={`/watch/${video.oid}`}
            state={{ videoData: video }}
        >
            <img
                className={[styles.img].join(" ")}
                src={getThumb(video.thumb)}
                alt={"thumbnails"}
            ></img>
            <div className={[styles.title, styles.item].join(" ")}>
                {video.title}
            </div>
            <div className={[styles.statsWrap, styles.item].join(" ")}>
                <div
                    className={[
                        styles.stats,
                        getBackground(video.success)
                    ].join(" ")}
                >
                    {(video.success?.correctCount ?? 0) * 100 +
                        " / " +
                        (video.success?.questionCount ?? 0) * 100 +
                        " Pt."}
                </div>
            </div>
            <div className={[styles.duration].join(" ")}>{video.duration}</div>
        </Link>
    )
}

function getThumb(url) {
    return url.replace("_catalog", "")
}

function getBackground(success) {
    // if (success.correctCount == success.questionCount) {
    return styles.all
    // }
    // if (success.correctCount > 0) {
    //     return styles.partly
    // }
}
