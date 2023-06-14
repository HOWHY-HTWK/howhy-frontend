import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Html5QrcodePlugin from '../components/Html5QrcodeScannerPlugin';
import styles from './css/QrCheck.module.css'
import { checkCode, redeem } from '../api';

export default function QrCheck() {
    const [prizeData, setPrize] = useState(null);

    function onNewScanResult(decodedText, decodedResult) {
        if (prizeData != null) {
            // nothing
        } else {
            checkCodeFromQr(getCodeFromUrl(decodedText))
        }
    }

    function getCodeFromUrl(url) {
        let code = url.split("/qr/");
        return code[1];
    }

    function checkCodeFromQr(code) {
        checkCode(code).then(response => {
            console.log(response.prize)
            setPrize({ prize: response.data.prize, code: code, redeemed: response.data.redeemed })
        }).catch(error => {
            console.log(error)
        })
    }

    function redeemPrize() {
        redeem(prizeData.code).then(response => {
            console.log('succsesful redeem')
            console.log(response)
            setPrize({ prize: response.data.prize, redeemed: response.data.redeemed })
        }).catch(error => {
            console.log(error.response)
        })
    }

    function getPrize() {
        return (
            <div className={['center', styles.wrap].join(' ')} >
                <div className={['listElement', 'centerVertical'].join(' ')} >
                    {prizeData.prize.title}
                    {prizeData.redeemed ?
                        <p>Code wurde bereits eingelöst</p>
                        :
                        <button className={['button'].join(' ')} onClick={redeemPrize} >Einlösen</button>
                    }
                    <button className={['button'].join(' ')} onClick={() => setPrize(null)} >Neuen Code Scannen</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            {prizeData ? getPrize() : null}
            <div className={[styles.scanner, prizeData ? styles.hidden : null].join(' ')} >
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={true}
                    qrCodeSuccessCallback={onNewScanResult}
                    aspectRatio={1.0}
                />
            </div>
        </div>
    )
}