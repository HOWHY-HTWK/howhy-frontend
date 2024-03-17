import { useEffect, useRef, useState } from "react"

export const useCache = (url, axiosClient) => {
    const [response, setResponse] = useState()
    const cache = useRef({})

    useEffect(() => {
        if (!url) return
        const renderData = async () => {
            if (cache.current[url]) {
                const response = cache.current[url]
                setResponse(response)
            } else {
                const response = axiosClient.get(url)
                cache.current[url] = await response // set response in cache;
                setResponse(await response)
            }
        }
        renderData()
    })
    return response
}
