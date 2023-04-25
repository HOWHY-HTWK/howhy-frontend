import axios from "axios";

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    withCredentials: true,
})
export function getVideos(){
    return apiClient.get('/videos')
}

export function getQuestionTimecodes(videoId){
    return apiClient.get(`/timecodes/${videoId}`)
}

export function getQuestionData(id){
    return apiClient.get(`/question/${id}`)
}

export function checkAnswers(id, request){
    return apiClient.post(`/question/checkAnswers/${id}`, request)
}

export function getQuestions(videoId){
    return apiClient.get(`/questions/${videoId}`)
}
export function storeQuestion(data){
    return apiClient.post(`/question`, data)
}
export function deleteQuestion(id){
    return apiClient.post(`/deleteQuestion/${id}`)
}


