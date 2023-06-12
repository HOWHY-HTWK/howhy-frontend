import axios from "axios";

const backendClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    withCredentials: true,
})

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    withCredentials: true,
})

export function getVideos() {
    return apiClient.get('/videos')
}

export function getVideo(videoId) {
    return apiClient.get(`/video/${videoId}`)
}

export function getQuestionTimecodes(videoId) {
    return apiClient.get(`/timecodes/${videoId}`)
}

export function getQuestionData(id) {
    return apiClient.get(`/question/${id}`)
}

export function checkAnswers(request) {
    return apiClient.post(`/question/checkAnswers/`, request)
}

export function getQuestions(videoId) {
    return apiClient.get(`/questions/${videoId}`)
}
export function storeQuestion(data) {
    return apiClient.post(`/question`, data)
}
export function deleteQuestion(id) {
    return apiClient.post(`/deleteQuestion/${id}`)
}

export function score() {
    return apiClient.get(`/score/`)
}

// ---------- email allowlist
export function getEmails() {
    return apiClient.get('/allowed-email')
}

export function postEmail(request) {
    return apiClient.post('/allowed-email', request)
}

export function deleteEmail(id) {
    return apiClient.delete(`/allowed-email/${id}`)
}

// ---------- bearbeiten Rechte geben

export function getUsers() {
    return apiClient.get(`/users/`)
}

export function giveEditorRights(id) {
    return apiClient.post(`/makeEditor/${id}`)
}

// ---------- user 

export function refreshUser() {
    return apiClient.get(`/user/`)
}

export function saveUsername(request) {
    return apiClient.post(`/username/`, request)
}

export function ranking() {
    return apiClient.get(`/ranking/`)
}

// ----------  authetification

export function csfrCookie() {
    return backendClient.get('/sanctum/csrf-cookie')
}

export function forgotPassword(email) {
    return backendClient.post('/forgot-password', {
        email: email,
    })
}
export function resetPassword(email, password, repeatPassword, token) {
    return backendClient.post('/reset-password', {
        email: email,
        password: password,
        password_confirmation: repeatPassword,
        token: token,
    })
}

export function verifyEmail(id, hash, expires, signature) {
    return backendClient.get(`/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`)
}

// ---------- prizes

export function getPrizes() {
    return apiClient.get(`/prizes/`)
}

export function getCode(id) {
    return apiClient.get(`/code/${id}`)
}

export function checkCode(code) {
    return apiClient.get(`/checkCode/${code}`)
}
