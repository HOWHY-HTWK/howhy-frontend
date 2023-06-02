import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './css/VideoList.module.css'
import videoListStyles from '../components/css/VideoList.module.css'


export default function EditorVideoList({ title, videoList }) {

    const videos = videoList ? videoList.map(video => getListItem(video)) : null

    function getListItem(video) {
        return (
            <div className={[videoListStyles.videoInList, 'listElement'].join(' ')} key={video.oid}>
                <div className={[videoListStyles.Title].join(' ')} >{video.title}</div>
                <img className={[videoListStyles.Thumb].join(' ')} src={video.thumb}></img>
                <div className={[videoListStyles.buttonWrap].join(' ')} >
                    <Link className={['button'].join(' ')} to={`/editor/edit/${video.oid}`} state={{ videoData: video }}>Bearbeiten</Link>
                    <Link className={['button'].join(' ')} target="_blank" to={`/watch?id=${video.oid}`}>Ansehen</Link>
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
