import { Html5QrcodeScanner } from "html5-qrcode"
import React, { useEffect, useRef } from "react"

const qrcodeRegionId = "html5qr-code-full-region"

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
    let config: any = {}
    if (props.fps) {
        config.fps = props.fps
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip
    }
    return config
}

/**
 * This Component Wraps the hmtl5qrcodescanner wich is a framework agnostic qrcode scanner, and makes
 * it usable in react. It calls the onnewScanresult when it recognized a qrcode. The UI of the Scanner
 * comes with Html5QrcodeScanner Instance.
 * @param {*} props
 * @returns
 */
const Html5QrcodePlugin = (props) => {
    const html5QrcodeScanner = useRef(null)
    useEffect(() => {
        // when component mounts
        const config = createConfig(props)
        const verbose = props.verbose === true
        html5QrcodeScanner.current = new Html5QrcodeScanner(
            qrcodeRegionId,
            config,
            verbose
        )

        // Suceess callback is required.
        if (!props.qrCodeSuccessCallback) {
            throw "qrCodeSuccessCallback is required callback."
        }
        // console.log(html5QrcodeScanner.current.getState())

        html5QrcodeScanner.current.render(
            props.qrCodeSuccessCallback,
            props.qrCodeErrorCallback
        )
        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.current.clear().catch((error) => {
                console.error("Failed to clear html5QrcodeScanner. ", error)
            })
        }
    }, [])

    function onNewScanResult(decodedText, decodedResult) {
        html5QrcodeScanner.current.clear()

        let callback = props.qrCodeSuccessCallback
        callback(decodedText, decodedResult)
    }

    return <div id={qrcodeRegionId} />
}

export default Html5QrcodePlugin
