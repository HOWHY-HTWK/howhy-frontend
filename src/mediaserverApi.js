import axios from "axios"

export async function getVideoInfoFromMediaserver(videoId) {
    return axios.get('https://mediaserver.htwk-leipzig.de/api/v2/medias/get/', { params: { oid: videoId } })
      .then(function (response) {
        return response.data.info
      })
  }