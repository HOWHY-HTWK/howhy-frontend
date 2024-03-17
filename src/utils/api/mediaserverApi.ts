import axios from "axios"
import { Video } from "../../pages/app/videolist/useVideoList"

export const apiClient = axios.create({
    baseURL: "https://mediaserver.htwk-leipzig.de/api"
})

export async function getVideoInfoFromMediaserver(videoId): Promise<Video> {
    return apiClient
        .get("/v2/medias/get/", { params: { oid: videoId } })
        .then(function (response) {
            return response.data.info as Video
        })
        .catch((error) => {
            console.log(error)
            return null
        })
}

export function getRecources(videoId) {
    return apiClient.get(`/v2/medias/playlist/?oid=${videoId}`)
}

export function getHowhyChannelVideos() {
    return apiClient.get(
        "/v2/channels/content/?parent_oid=c12663da47978macepj9&content=v"
    )
}
