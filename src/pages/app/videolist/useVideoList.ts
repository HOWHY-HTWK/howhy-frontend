import {
    getHowhyChannelVideos,
    getVideoInfoFromMediaserver
} from "../../../utils/api/mediaserverApi"
import useAsync from "../../../utils/useAsync"

export interface VideoListResult {
    videoList: Video[]
    isLoading: boolean
    error: Error
}

export const useVideoList = (): VideoListResult => {
    const { value, loading, error } = useAsync<Video[]>(() => getVideos(), [])

    const videoList = filterAndSortVideos(value)

    return {
        videoList: videoList ?? [],
        isLoading: loading,
        error
    }
}

async function getVideos() {
    const channelResponse = await getHowhyChannelVideos()
    return makeVideoList(channelResponse.data["videos"])
}

function makeVideoList(videos: MediaserverVideo[]) {
    return Promise.all(
        videos
            .map(async (video) => {
                let videoWithData = await getVideoInfoFromMediaserver(video.oid)

                if (videoWithData) {
                    videoWithData.success = video.success
                }

                return videoWithData
            })
            .filter((item) => item !== null)
    )
}

function filterAndSortVideos(videoList: Video[]) {
    if (videoList != undefined) {
        return videoList.sort(sortTitlesByAlphabet())
    }
}

function sortTitlesByAlphabet() {
    return (a: Video, b: Video) => {
        if (a.title < b.title) {
            return -1
        } else if (a.title > b.title) {
            return 1
        }
        return 0
    }
}

interface MediaserverVideo {
    oid: string
    success: any
}

export interface Video {
    oid: string
    title: string
    thumb: string
    speaker: string
    duration: number
    success: { correctCount: number; questionCount: number }
}
