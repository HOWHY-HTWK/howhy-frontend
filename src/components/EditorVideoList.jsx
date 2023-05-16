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
}
