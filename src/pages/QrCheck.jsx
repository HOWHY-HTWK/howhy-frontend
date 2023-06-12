import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Html5QrcodePlugin from '../components/html5QrcodeScannerPlugin';
import styles from './css/QrCheck.module.css'
import { checkCode } from '../api';

export default function QrCheck() {
    const code = useParams().code;

    const [prize, setPrize] = useState(null);

    function onNewScanResult(decodedText, decodedResult) {
        checkCodeFromQr(decodedText)
    }

    function getCodeFromUrl(url) {
        let code = url.split("/qr/");
        return code[1];
    }

    function checkCodeFromQr(code) {
        checkCode(getCodeFromUrl(code)).then(response => {
            setPrize(response.data)
        }).catch(error => {
            console.log(error.response.data)
        })
    }

    return (
        <div>
            {prize ?
                prize.title
                :
                <div className={[styles.scanner].join(' ')} >
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={250}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                        aspectRatio={1.0}
                    />
                </div>
            }

        </div>
    )
}