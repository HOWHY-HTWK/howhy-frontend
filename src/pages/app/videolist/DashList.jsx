import React, { useEffect, useRef, useState } from 'react'
import styles from './Dashlist.module.css'
import { Link, NavLink } from 'react-router-dom'
import * as api from 'src/utils/api/api.js'
import * as mediaserverApi from 'src/utils/api/mediaserverApi.js'

import Loader from 'src/sharedComponents/Loader'

/**
 * The List of videos that is displayed in the "Videos Tab"
 * @param {*} param0 
 * @returns 
 */
export default function DashList({ searchterm = '', random = false }) {
    const [videoList, setvideoList] = useState([]);
    const videoDataRef = useRef({});

    const filteredList = filterList(videoList);
    sortListAlphabetically(filteredList)
    // const completedAtBottom = completedToTheBottom(filteredList)
    const videos = filteredList.map(video => getListItem(video))

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
                //     ||
                // item
                //     .keywords
                //     .toLowerCase()
                //     .includes(searchterm.toLowerCase())
            );
        })
    }

    function getThumb(url) {
        return url.replace("_catalog", "")
    }

    // function shuffleList(list) {
    //     return list ?
    //         list
    //             .map(value => ({ value, sort: Math.random() }))
    //             .sort((a, b) => a.sort - b.sort)
    //             .map(({ value }) => value)
    //         :
    //         null
    // }

    function sortListAlphabetically(list) {
        return list.sort((a, b) => {
            if (a.title < b.title) {
                return -1; // a should come before b in the sorted order
            } else if (a.title > b.title) {
                return 1; // b should come before a in the sorted order
            }
            return 0; // names are equal, maintain the original order
        })
    }

    function completedToTheBottom(list) {
        let notCompleted = list.filter(video => { return video.success.correctCount !== video.success.questionCount })
        let completed = list.filter(video => { return video.success.correctCount === video.success.questionCount })
        return notCompleted.concat(completed);
    }

    function getBackground(success) {
        // if (success.correctCount == success.questionCount) {
            return styles.all
        // }
        // if (success.correctCount > 0) {
        //     return styles.partly
        // }
    }

    function getVideos() {
        // api.getVideos()
        //     .then(response => {
        //         makeVideoList(response.data)
        //     })
        mediaserverApi.getHowhyChannelVideos()
            .then(response => {
                makeVideoList(response.data["videos"])
            })
    }

    async function makeVideoList(videos) {
        console.log(videos)
        let videoList = await Promise.all(
            videos.map(async video => {
                if (videoDataRef.current[video.oid]) {
                    return videoDataRef.current[video.oid]
                }
                let videoWithData = await mediaserverApi.getVideoInfoFromMediaserver(video.oid)
                if (videoWithData) {
                    console.log(videoWithData)
                    videoWithData.success = video.success
                    videoDataRef.current[video.oid] = videoWithData
                } else {
                    videoWithData = null;
                }
                return videoWithData;
            })
        )
        let listWithoutNull = videoList.filter(item => item !== null)
        setvideoList(listWithoutNull)
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
                    src={getThumb(video.thumb)}>
                </img>
                <div className={[styles.title, styles.item].join(' ')} >
                    {video.title}
                </div>
                <div className={[styles.statsWrap, styles.item].join(' ')} >
                    <div className={[styles.stats, getBackground(video.success)].join(' ')} >
                        {(video.success?.correctCount ?? 0)  * 100 + ' / ' + (video.success?.questionCount ?? 0) * 100 + ' Pt.'}
                    </div>
                </div>
                <div className={[styles.duration].join(' ')} >{video.duration}</div>
                {/* <div className={[styles.star, styles.item].join(' ')} >
                    <img src={starIcon}></img>
                </div> */}
                {/* <div className={[styles.views, styles.item].join(' ')} >
                    {video.views}&nbsp;
                    <img src={viewsIcon}></img>
                </div> */}
            </Link>
        )
    }

    return (
        <div className={[styles.wrap, 'center'].join(' ')} >
            {videoList.length != 0 ? videos : <Loader></Loader>}
        </div>
    )
}
