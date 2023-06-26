import React from 'react'
import { useState, useEffect, useRef } from 'react'
import QuestionEditor from 'src/pages/editor/edit/QuestionEditor'
import styles from './EditQuestions.module.css'
import QuestionList from './QuestionList'
import * as api from 'src/utils/api/api'
import { useLocation, useParams } from 'react-router-dom'
import HlsPlayer from 'src/sharedComponents/HlsPlayer'
import { getVideoInfoFromMediaserver } from 'src/utils/api/mediaserverApi'

/**
 * On this Page a Video is displayed and Question of the Video can be edited and added. 
 * When a Question is edited or Added, the QuestionEditor is displayed.
 * @returns 
 */
export default function EditQuestions() {
    const videoId = useParams().videoId;

    const [editedQuestion, setEditedQuestion] = useState(null)
    const [videoData, setVideoData] = useState(null)
    const [questions, setQuestions] = useState([])
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

    function addNewQuestion() {
        let newQuestion = {
            videoId: videoId,
            questionText: '',
            timecode: time,
            type: 'singlechoice',
            correctAnswers: [{ 'id': 0, 'correct': false }],
            answers: [{ "id": 0, "text": '', }],
        }
        setEditedQuestion(newQuestion)
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
            {editedQuestion ?
                <QuestionEditor
                    duration={duration}
                    time={time}
                    editedQuestion={editedQuestion}
                    setEditedQuestion={setEditedQuestion} />
                :
                <>
                    <button className={['button', styles.addButton].join(' ')} onClick={addNewQuestion}>Neue Frage zum aktuellen Zeitpunk hinzufügen</button>
                    <QuestionList
                        questions={questions}
                        editQuestion={setEditedQuestion}
                        deleteQuestion={deleteQuestion}
                        seteditedQuestion={setEditedQuestion}></QuestionList>
                </>
            }
        </div>
    )
}
