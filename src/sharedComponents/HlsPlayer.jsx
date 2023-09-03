import React, { forwardRef, useEffect, useRef } from 'react'
import Hls from "hls.js";
import styles from './HlsPlayer.module.css'

/**
 * Contains an Instance of hls.js wich can play m3u8 resource files. It revives the Link the the
 * resource File of a Video. It updates the duration property of the Parent when the video 
 * is loades with the setDuration function. Also it calls the timeUpate function of the Parent every
 * time the is a Timeupdate Event.
 * It check if the hls.js player supported. If not the default player is used (iPhone). The required
 * Extensions for hls.js are supported by every moden Browser exept Safari on iPhone wich can play
 * hls Files natively.
 * 
 * @param {String} url 
 * @param {Function} timeUpdate 
 * @param {Function} setDuration 
 * @param {Object} ref
 */
const HlsPlayer = forwardRef(function HlsPlayer({ url, timeUpdate, setDuration }, ref) {
    const videoRef = ref;
    const hls = new Hls();

    useEffect(() => {
        if (url) {
            if (Hls.isSupported()) {
                hls.loadSource(url);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, function () { video.play(); });
            }
            else if (videoRef.current.canPlayType("application/x-mpegURL")) {
                videoRef.current.src = url;
            }
        }
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
            playsInline
        />
    )
})

export default HlsPlayer
