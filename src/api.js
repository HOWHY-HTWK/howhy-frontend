import axiosClient from "../axios-client"

export function getVideos(){
    return axiosClient.get('/api/videos')
}

export function getQuestionTimecodes(videoId){
    return axiosClient.get(`/api/timecodes/${videoId}`)
}

export function getQuestionData(id){
    return axiosClient.get(`/api/question/${id}`)
}

export function checkAnswers(id, request){
    return axiosClient.post(`/api/question/checkAnswers/${id}`, request)
}