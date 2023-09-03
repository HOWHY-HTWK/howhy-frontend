import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Html5QrcodePlugin from 'src/sharedComponents/Html5QrcodeScannerPlugin';
import styles from './QrCheck.module.css';
import { checkCode, redeem } from 'src/utils/api/api';

/**
 * This Page includes a Qr-Code reader wich can scan codes and check them with the backend. 
 * Then the the code can be redeemed with a button click wich gets confirmed by the backend. 
 * @returns 
 */
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
                        <p>Der Preis wurde erfolgreich eingelöst!</p>
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