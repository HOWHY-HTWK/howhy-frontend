import React, { forwardRef, useEffect, useRef } from 'react'
import Hls from "hls.js";
import styles from './css/HlsPlayer.module.css'

const HlsPlayer = forwardRef(function HlsPlayer({ url, timeUpdate, setDuration }, ref) {
    const videoRef = ref;
    const hls = new Hls();

    useEffect(() => {
        hls.loadSource(url);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function () { video.play(); });
        setDuration(videoRef.current.duration)
        videoRef.current.ontimeupdate = e => timeUpdate(e.target.currentTime)
        videoRef.current.ondurationchange = e => setDuration(e.target.duration)
    }, [])

    return (
        <video
            className={[styles.video].join(' ')}
            ref={videoRef}
            autoPlay={true}
            controls
        />
    )
})

export default HlsPlayer
