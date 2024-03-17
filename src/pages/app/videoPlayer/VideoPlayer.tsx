import React, { useEffect, useRef, useState } from "react"
import styles from "./VideoPlayer.module.css"
import { useParams } from "react-router-dom"
import { useStateContext } from "../../../contexts/ContextProvider"
import { getVideoInfoFromMediaserver } from "../../../utils/api/mediaserverApi"
import { getQuestionTimecodes } from "../../../utils/api/api"
import QuestionsTimeline from "./components/QuestionsTimeline"
import HlsPlayer from "../../shared/components/HlsPlayer"
import Question from "./components/Question"
import Loader from "../../shared/components/Loader"

/**
 * On this page the use can watch the Video and the questions get displayed. When opening the page
 * a list of timecodes for all questions is loaded. On every timeupdate Event from the videoplayer
 * the list of timecodes is checked if a question should be displayed. The hls resources file is given to the Player.
 * The videoId is read from the URL.
 *
 * @returns
 */
export const VideoPlayer = () => {
    const videoId = useParams().videoId

    const { updateUserData } = useStateContext()

    const [questionTimecodes, setQuestionTimecodes] = useState([])
    const [currentQuestionId, setCurrentQuestionId] = useState(null)
    const [duration, setDuration] = useState(null)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [videoData, setVideoData] = useState(null)

    const fullScreenWrapper = useRef(null)
    const oldTimeRef = useRef(null)
    const timecodesRef = useRef(questionTimecodes)
    const videoRef = useRef(null)

    useEffect(() => {
        getVideoInfoFromMediaserver(videoId).then((response) => {
            setVideoData(response)
        })

        getTimecodes()
    }, [])

    useEffect(() => {
        timecodesRef.current = questionTimecodes
    }, [questionTimecodes])

    useEffect(() => {
        if (currentQuestionId && videoRef.current) {
            videoRef.current.pause()
            closeFullscreen()
        } else {
            videoRef.current.play()
        }
    }, [currentQuestionId])

    function refreshData() {
        getTimecodes()
        updateUserData()
    }

    function getTimecodes() {
        getQuestionTimecodes(videoId).then((response) => {
            setQuestionTimecodes(response.data)
        })
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.exitFullscreen()) {
            /* Safari */
            document.exitFullscreen()
        } else if (document.exitFullscreen()) {
            /* IE11 */
            document.exitFullscreen()
        } else {
            // Safari on IOS doesnt support exitFullscreen so an alert has to be dispatched to close fullscreen.
            alert("Beantworte die Frage!")
        }
    }

    function displayQuestion() {
        return currentQuestionId && videoRef.current ? (
            <div
                className={[
                    styles.questionWrapper,
                    isFullscreen ? styles.questionWrapperFS : ""
                ].join(" ")}
            >
                <Question
                    questionId={currentQuestionId}
                    setQuestionId={setCurrentQuestionId}
                    refreshData={refreshData}
                />
            </div>
        ) : null
    }

    function handleTimeUpdate(time) {
        let questionId = findQuestionId(time)
        if (questionId) {
            setCurrentQuestionId(questionId)
        }
    }

    function findQuestionId(time) {
        let question = null
        // only search question when not skipping (if time difference is less than 1s)
        if (time - oldTimeRef.current < 1) {
            question = timecodesRef.current.find((question) => {
                return (
                    (oldTimeRef.current <= question.timecode &&
                        question.timecode <= time) ||
                    question.timecode == time
                )
            })
        }
        oldTimeRef.current = Number(time) + Number(0.000001)
        return question ? question.id : null
    }

    function jumpToQuestion(time, questionId) {
        videoRef.current.currentTime = time
        setCurrentQuestionId(questionId)
    }

    return (
        <div
            className={[
                styles.wrapper,
                isFullscreen ? styles.wrapperFS : ""
            ].join(" ")}
        >
            <div
                ref={fullScreenWrapper}
                className={[
                    styles.videoWrapper,
                    isFullscreen ? styles.videoWrapperFS : ""
                ].join(" ")}
            >
                <HlsPlayer
                    className={[
                        styles.player,
                        isFullscreen ? styles.playerFS : ""
                    ].join(" ")}
                    url={`https://mediaserver.htwk-leipzig.de/api/v2/medias/playlist/?oid=${videoId}&?all`}
                    timeUpdate={handleTimeUpdate}
                    setDuration={setDuration}
                    ref={videoRef}
                />
                {/* <div className={[styles.fsButton].join(' ')} onClick={fullscreen}></div> */}
                <div className={[styles.title].join(" ")}>
                    {videoData?.title}
                </div>
            </div>
            {displayQuestion()}
            {questionTimecodes && duration ? (
                <div
                    className={[
                        styles.timeline,
                        isFullscreen ? styles.timelineFS : ""
                    ].join(" ")}
                >
                    <QuestionsTimeline
                        className={[
                            styles.timeline,
                            isFullscreen ? styles.timelineFS : ""
                        ].join(" ")}
                        questionTimecodes={questionTimecodes}
                        duration={duration}
                        jumpToQuestion={jumpToQuestion}
                    />
                </div>
            ) : (
                <div className={[styles.loader].join(" ")}>
                    <Loader></Loader>
                </div>
            )}
        </div>
    )
}
