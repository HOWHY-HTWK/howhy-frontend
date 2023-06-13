import React, { useEffect, useState } from 'react'
import styles from './css/Dashlist.module.css'
import { Link, NavLink } from 'react-router-dom'
import * as api from '../api.js'
import * as mediaserverApi from '../mediaserverApi.js'

import viewsIcon from '../assets/icons/views.svg'
import starIcon from '../assets/icons/star.svg'
import Loader from './Loader'

export default function DashList({ searchterm = '', random = false }) {
    const [videoList, setvideoList] = useState([]);

    const filteredList = filterList(videoList);
    const list = filteredList.map(video => getListItem(video))
    const videos = shuffleList(list)

    useEffect(() => {
        if (videoList.length == 0) {
            getVideos()
        }
    }, [])

    function filterList(list) {
        return list.filter(item => {
            return (
                item
                    .title
                    .toString()
                    .toLowerCase()
                    .includes(searchterm.toLowerCase()) ||
                item
                    .speaker
                    .toLowerCase()
                    .includes(searchterm.toLowerCase())
            );
        })
    }

    function getListItem(video) {
        return (
            <Link
                className={[styles.listItem, 'listElement'].join(' ')}
                key={video.oid}
                to={`/watch/${video.oid}`}
                state={{ videoData: video }}>
                <img
                    className={[styles.img].join(' ')}
                    src={video.thumb}>
                </img>
                <div className={[styles.title, styles.item].join(' ')} >
                    {video.title}
                </div>
                <div className={[styles.star, styles.item].join(' ')} >
                    <img src={starIcon}></img>
                </div>
                <div className={[styles.statsWrap, styles.item].join(' ')} >
                    <div className={[styles.stats, getBackground(video.success)].join(' ')} >
                        {video.success.correctCount + ' / ' + video.success.questionCount}
                    </div>
                </div>
                <div className={[styles.views, styles.item].join(' ')} >
                    {video.views}&nbsp;
                    <img src={viewsIcon}></img>
                </div>
            </Link>
        )
    }

    function shuffleList(list) {
        return list ?
            list
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
            :
            null
    }

    function getBackground(success) {
        if (success.correctCount == success.questionCount) {
            return styles.all
        }
        if (success.correctCount > 0) {
            return styles.partly
        }
    }

    function getVideos() {
        api.getVideos()
            .then(response => {
                makeVideoList(response.data)
            })
    }

    async function makeVideoList(videos) {
        let videoList = await Promise.all(
            videos.map(async video => {
                let videoWithData = await mediaserverApi.getVideoInfoFromMediaserver(video.videoId)
                videoWithData.success = video.success;
                return videoWithData;
            })
        )
        setvideoList(videoList)
    }
    return (
        <div className={[styles.wrap, 'center'].join(' ')} >
            {videoList.length != 0 ? videos : <Loader></Loader>}
        </div>
    )
}
