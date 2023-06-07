import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Hls from "hls.js";
import styles from './css/HlsPlayer.module.css'
import axios from 'axios';
import { getModes } from '../mediaserverApi';

const HlsPlayer = forwardRef(function HlsPlayer({ videoId, timeUpdate, setDuration }, ref) {
    const videoRef = ref;
    const hls = new Hls();
    const [url, setUrl] = useState(null)

    useEffect(() => {
        getModes(videoId).then(response => {
            console.log(response.data)
            setUrl(response.data['540p'].resource.url)
        }).catch(error => {
            alert(error.respone.data.message)
        })
    }, [])

    useEffect(() => {
        if (url) {
            if (videoRef.current.canPlayType("application/x-mpegURL")) {
                videoRef.current.src = url;
            }
            else if (Hls.isSupported()) {
                hls.loadSource(url);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, function () { video.play(); });
            }
            setDuration(videoRef.current.duration)
            videoRef.current.ontimeupdate = e => timeUpdate(e.target.currentTime)
            videoRef.current.ondurationchange = e => setDuration(e.target.duration)
        }
    }, [url])


    return (
        <video
            className={[styles.video].join(' ')}
            crossOrigin={'true'}
            ref={videoRef}
            autoPlay={true}
            type={'application/x-mpegURL'}
            controls
            playsInline
        />
    )
})

export default HlsPlayer
