import React from 'react'
import { useParams } from 'react-router-dom'
import Html5QrcodePlugin from '../components/html5QrcodeScannerPlugin';
import styles from './css/QrCheck.module.css'

export default function QrCheck() {
    const code = useParams().code;

    function onNewScanResult(decodedText, decodedResult) {
        console.log(decodedText, decodedResult)
    }

    return (
        <div>
            <div className={[styles.scanner].join(' ')} >
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                    aspectRatio={1.0}
                />
            </div>
        </div>
    )
}