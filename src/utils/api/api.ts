import axios from "axios"
import axiosClient from "./axios-client"
import { LoginProps } from "../../pages/app/login/UserLogin"
import { RegisterUserProps } from "../../pages/app/login/RegisterForm"

const backendClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    withCredentials: true
})

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    withCredentials: true
})

export function getVideos() {
    return apiClient.get("/videos")
}

export function getVideo(videoId: string) {
    return apiClient.get(`/video/${videoId}`)
}

export function getQuestionTimecodes(videoId: string) {
    return apiClient.get(`/timecodes/${videoId}`)
}

export function getQuestionData(id: string) {
    return apiClient.get(`/question/${id}`)
}

export function checkAnswers(request: any) {
    return apiClient.post(`/question/checkAnswers/`, request)
}

export function getQuestions(videoId: string) {
    return apiClient.get(`/questions/${videoId}`)
}

export function storeQuestion(data: any) {
    return apiClient.post(`/question`, data)
}

export function deleteQuestion(id: string) {
    return apiClient.post(`/deleteQuestion/${id}`)
}

export function score() {
    return apiClient.get(`/score/`)
}

export async function getCsrfCookie() {
    return await axiosClient.get("/sanctum/csrf-cookie")
}

export async function loginUser(props: LoginProps) {
    await getCsrfCookie()
    return axiosClient.post("/login", props)
}

export async function registerUser(props: RegisterUserProps) {
    await getCsrfCookie()
    return axiosClient.post("/register", props)
}

// ---------- email allowlist
export function getEmails() {
    return apiClient.get("/allowed-email")
}

export function postEmail(request: any) {
    return apiClient.post("/allowed-email", request)
}

export function deleteEmail(id: string) {
    return apiClient.delete(`/allowed-email/${id}`)
}

// ---------- bearbeiten Rechte geben

export function getUsers() {
    return apiClient.get(`/users/`)
}

export function giveEditorRights(id: string) {
    return apiClient.post(`/makeEditor/${id}`)
}

// ---------- user

export function refreshUser() {
    return apiClient.get(`/user/`)
}

export function saveUsername(request: any) {
    return apiClient.post(`/username/`, request)
}

export function ranking() {
    return apiClient.get(`/ranking/`)
}

export function deleteUser() {
    return apiClient.get(`/deleteUser/`)
}

// ----------  authetification

export function csfrCookie() {
    return backendClient.get("/sanctum/csrf-cookie")
}

export function forgotPassword(email: string) {
    return backendClient.post("/forgot-password", {
        email: email
    })
}

export function resetPassword(
    email: string,
    password: string,
    repeatPassword: string,
    token: string
) {
    return backendClient.post("/reset-password", {
        email: email,
        password: password,
        password_confirmation: repeatPassword,
        token: token
    })
}

export function verifyEmail(
    id: string,
    hash: string,
    expires: any,
    signature: any
) {
    return backendClient.get(
        `/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`
    )
}

// ---------- prizes

export function getPrizes() {
    return apiClient.get(`/prizes/`)
}

export function getCode(id: string) {
    return apiClient.get(`/code/${id}`)
}

export function checkCode(code: string) {
    return apiClient.get(`/checkCode/${code}`)
}

export function postPrize(request: any) {
    return apiClient.post("/prize", request)
}

export function updatePrize(id: string, request: any) {
    return apiClient.post(`/prize/${id}`, request)
}

export function deletePrize(id: string) {
    return apiClient.delete(`/prize/${id}`)
}

export function redeem(code: string) {
    return apiClient.get(`/redeemCode/${code}`)
}

export function postMessage(request: any) {
    return apiClient.post("/prizes/message", request)
}

export function getMessage() {
    return apiClient.get("/prizes/message")
}

// statistics

export function getUsage() {
    return apiClient.get("/usage/")
}
