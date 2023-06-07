import { useState, useEffect, useRef } from 'react'
import styles from './css/WatchVideo.module.css'
import Question from '../components/Question'
import QuestionsTimeline from '../components/QuestionsTimeline'
import * as utils from '../utils.js'
import Score from '../components/Score'
import * as api from '../api'
import { useStateContext } from '../contexts/ContextProvider'
import { useLocation, useParams } from 'react-router-dom'
import { getRecources, getVideoInfoFromMediaserver } from '../mediaserverApi'
import HlsPlayer from '../components/HlsPlayer'
import Loader from '../components/Loader'
import VideoJS from '../components/VideoJs'

function WatchVideo() {
    const videoId = useParams().videoId;

    const { user, setUser, updateUserData } = useStateContext()

    const [questionTimecodes, setQuestionTimecodes] = useState([])
    const [currentQuestionId, setCurrentQuestionId] = useState(null)
    const [duration, setDuration] = useState(null)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [videoData, setVideoData] = useState(null)
    // const [sources, setSources] = useState(null)

    const fullScreenWrapper = useRef(null);
    const oldTimeRef = useRef(null);
    const timecodesRef = useRef(questionTimecodes);
    const videoRef = useRef(null)
    const playerRef = useRef(null);
    const iframe = useRef(null);

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };

    useEffect(() => {
        // getRecources(videoId).then(response => {
        // 	setSources(response.data)
        // })
        getVideoInfoFromMediaserver(videoId).then(response => {
            console.log(response)
            setVideoData(response)
        }).catch(error => {
        })
    }, [])

    useEffect(() => {
        timecodesRef.current = questionTimecodes
    }, [questionTimecodes]);

    useEffect(() => {
        refreshData()
    }, [])

    function refreshData() {
        getTimecodes()
        updateUserData()
    }

    function getTimecodes() {
        api.getQuestionTimecodes(videoId).then(response => {
            setQuestionTimecodes(response.data)
        })
    }

    function fullscreen() {
        if (!isFullscreen) {
            fullScreenWrapper.current.requestFullscreen();
            screen.orientation.lock("landscape")
            document.body.style.height = "100vh";
            document.body.style.overflow = "clip";
        } else {
            document.exitFullscreen();
            document.body.style.height = "unset";
            document.body.style.overflow = "unset";
        }
        setIsFullscreen(!isFullscreen);
    }

    // function displayQuestion() {
    //     if (currentQuestionId && videoRef.current) {
    //         videoRef.current.pause()
    //         return (
    //             <div className={[styles.questionWrapper, isFullscreen ? styles.questionWrapperFS : ''].join(' ')} >
    //                 <Question
    //                     questionId={currentQuestionId}
    //                     setQuestionId={setCurrentQuestionId}
    //                     videoId={videoId}
    //                     refreshData={refreshData}
    //                 />
    //             </div>
    //         )
    //     }
    //     else {
    //         videoRef.current.play()
    //         return null;
    //     }
    // }

    function handleTimeUpdate(time) {
        let questionId = findQuestionId(time);
        if (questionId) {
            setCurrentQuestionId(questionId);
        }
    }

    function findQuestionId(time) {
        let question = null
        // only search question when not skipping (if time difference is less than 1s)
        if (time - oldTimeRef.current < 1) {
            question = timecodesRef.current.find(question => {
                return (
                    (oldTimeRef.current <= question.timecode && question.timecode <= time)
                    ||
                    (question.timecode == time)
                )
            })
        }
        oldTimeRef.current = Number(time) + Number(0.000001)
        return question ? question.id : null
    }

    function jumpToQuestion(time, questionId) {
        videoRef.current.currentTime = time
        setCurrentQuestionId(questionId);
    }

    return (
        <div className={[styles.wrapper, isFullscreen ? styles.wrapperFS : ''].join(' ')} >
            <div
                ref={fullScreenWrapper}
                className={[styles.videoWrapper, isFullscreen ? styles.videoWrapperFS : ''].join(' ')}>
                <HlsPlayer
                    className={[styles.player, isFullscreen ? styles.playerFS : ''].join(' ')}
                    videoId={videoId}
                    timeUpdate={handleTimeUpdate}
                    setDuration={setDuration}
                    ref={videoRef}
                />
                {/* <VideoJS
                    options={{
                        playsInline: true,
                        autoplay: true,
                        controls: true,
                        responsive: true,
                        fluid: true,
                        sources: [{
                            src: `https://mediaserver.htwk-leipzig.de/api/v2/medias/playlist/?oid=${videoId}&?all`,
                            type: "application/x-mpegURL"
                        }]
                    }}></VideoJS> */}
                {/* <iframe ref={iframe}
                    className={[styles.iframe, isFullscreen ? styles.iframeFS : ''].join(' ')}
                    src={`https://mediaserver.htwk-leipzig.de/permalink/${videoId}/iframe`}></iframe> */}
                <div className={[styles.fsButton].join(' ')} onClick={fullscreen}></div>
                <div className={[styles.title].join(' ')} >{videoData?.title}</div>
            </div>
            {/* {videoRef.current ? displayQuestion() : null} */}

            {questionTimecodes && duration ?
                <div className={[styles.timeline, isFullscreen ? styles.timelineFS : ''].join(' ')}  >
                    <QuestionsTimeline
                        className={[styles.timeline, isFullscreen ? styles.timelineFS : ''].join(' ')}
                        questionTimecodes={questionTimecodes}
                        duration={duration}
                        jumpToQuestion={jumpToQuestion} />
                </div> : <Loader></Loader>}
        </div >
    )
}

export default WatchVideo
