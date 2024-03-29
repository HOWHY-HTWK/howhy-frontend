import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from 'src/sharedComponents/VideoList.module.css'

/**
 * Displays a list of Videos with buttons to watch or edit the videos.
 * 
 * @param {string} title 
 * @param {list} videoList 
 * @returns 
 */
export default function EditorVideoList({ title, videoList }) {

    const videos = videoList ? videoList.map(video => getListItem(video)) : null

    function getListItem(video) {
        return (
            <div className={[styles.videoInList, 'listElement'].join(' ')} key={video.oid}>
                <div className={[styles.Title].join(' ')} >{video.title}</div>
                <img className={[styles.Thumb].join(' ')} src={video.thumb}></img>
                <div className={[styles.buttonWrap].join(' ')} >
                    <Link className={['button'].join(' ')} to={`/editor/edit/${video.oid}`} state={{ videoData: video }}>Bearbeiten</Link>
                    <Link className={['button'].join(' ')} target="_blank" to={`/watch/${video.oid}`}>Ansehen</Link>
                </div>
            </div>
        )
    }

    return (
        <div className={[styles.videoListWrapper].join(' ')} >
            {title}
            {videos ? <div className={[styles.videoListBody].join(' ')} >{videos}</div> : null}
        </div>
    )
}
