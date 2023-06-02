import React from 'react'
import { useState, useEffect, useRef } from 'react'
import QuestionEditor from '../components/QuestionEditor'
import axiosClient from '../../axios-client.jsx'
import styles from './css/EditQuestions.module.css'
import QuestionList from '../components/QuestionList'
import * as api from '../api'
import { useLocation, useParams } from 'react-router-dom'
import HlsPlayer from '../components/HlsPlayer'
import { getVideoInfoFromMediaserver } from '../mediaserverApi'

export default function EditQuestions() {
    const videoId = useParams().videoId;

    const [editedQuestion, setEditedQuestion] = useState(JSON.parse(localStorage.getItem('question')) != null ? 'multipleChoice' : null)
    const [videoData, setVideoData] = useState(null)
    const [questionType, setquestionType] = useState('multipleChoice')
    const [questions, setQuestions] = useState(null)
    const [duration, setDuration] = useState(null)
    const [time, setTime] = useState(null)

    const videoRef = useRef(null)

    useEffect(() => {
        getVideoInfoFromMediaserver(videoId).then(response => {
            console.log(response)
            setVideoData(response)
        }).catch(error => {
        })
    }, [])

    useEffect(() => {
        if (!editedQuestion) {
            loadQuestions()
        }
    }, [editedQuestion])

    function loadQuestions() {
        api.getQuestions(videoId)
            .then((response) => {
                setQuestions(response.data)
            }).catch((error) => {
            })
    }

    function displayAddQuestion() {
        if (editedQuestion == null) {
            return (
                <div className={[styles.addWrapper].join(' ')} >
                    <select className={['selector', styles.selector].join(' ')} value={questionType} onChange={e => setquestionType(e.target.value)}  >
                        <option value="multipleChoice">Multiple-Choice</option>
                        <option value="singleChoice">Single-Choice</option>
                    </select>
                    <button className="button" onClick={() => setEditedQuestion(questionType)}>{questionType}-Frage zum aktuellen Zeitpunk hinzufügen</button>
                </div>
            )
        }
    }

    function displayQuestionEditor() {
        if (editedQuestion == null) {
            return null
        } else if (editedQuestion == 'multipleChoice') {
            return (
                <QuestionEditor
                    duration={duration}
                    time={time}
                    existingQuestion={null}
                    videoId={videoId}
                    setEditedQuestion={setEditedQuestion}
                    singleChoice={false} />
            )
        } else if (editedQuestion == 'singleChoice') {
            return (
                <QuestionEditor
                    duration={duration}
                    time={time}
                    existingQuestion={null}
                    videoId={videoId}
                    setEditedQuestion={setEditedQuestion}
                    singleChoice={true} />
            )
        } else if (typeof editedQuestion == 'object') {
            return (
                <QuestionEditor
                    duration={duration}
                    time={time}
                    existingQuestion={editedQuestion}
                    videoId={videoId}
                    setEditedQuestion={setEditedQuestion} />
            )
        }
    }

    function deleteQuestion(question) {
        if (confirm('wirklich löschen?')) {
            api.deleteQuestion(question.id).then(response => {
                loadQuestions()
            }).catch(error => {
                alert(error.response.data.message)
            })
        }
    }

    function handleTimeUpdate(time) {
        setTime(time)
    }

    return (
        <div className={['centerVertical', styles.wrapper].join(' ')} >
            <div className={[styles.title].join(' ')} >{videoData?.title}</div>
            <div className={[styles.player].join(' ')} >
                <HlsPlayer
                    className={[styles.player].join(' ')}
                    url={`https://mediaserver.htwk-leipzig.de/api/v2/medias/playlist/?oid=${videoId}&?all`}
                    timeUpdate={handleTimeUpdate}
                    setDuration={setDuration}
                    ref={videoRef}
                />
            </div>
            {displayAddQuestion()}
            {displayQuestionEditor()}
            {!editedQuestion && questions ? <QuestionList questions={questions} editQuestion={setEditedQuestion} deleteQuestion={deleteQuestion} seteditedQuestion={setEditedQuestion}></QuestionList> : null}
        </div>
    )
}
