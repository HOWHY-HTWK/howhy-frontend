import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './css/VideoList.module.css'

export default function EditorVideoList({ title, videoList, getListItem }) {
    const videos = videoList ? videoList.map(video => getListItem(video)) : null

    return (
        <div className={[styles.videoListWrapper].join(' ')} >
            {title}
            {videos ? <div className={[styles.videoListBody].join(' ')} >{videos}</div> : null}
        </div>
    )

    function getListElement(video) {
        return (
            <div className={[styles.videoInList, 'listElement'].join(' ')} key={video.oid}>
                <div className={[styles.vlTitle].join(' ')} >{video.title}</div>
                <img className={[styles.vlThumb].join(' ')} src={video.thumb}></img>
                <div className={[styles.buttonWrap].join(' ')} >
                    <Link className={['button'].join(' ')} to={`/editor/edit/?id=${video.oid}`}>Bearbeiten</Link>
                    <Link className={['button'].join(' ')} target="_blank" to={`/watch?id=${video.oid}`}>Ansehen</Link>
                </div>
            </div>
        )
    }
}