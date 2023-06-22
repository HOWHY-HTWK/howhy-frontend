import React, { useEffect, useState } from 'react'
import styles from './css/Prizes.module.css'

import qrCode from '../assets/QR-Code.svg'
import qr_used from '../assets/icons/qr_used.svg'
import close from '../assets/icons/close.svg'
import { QRCodeSVG } from 'qrcode.react'
import { useStateContext } from '../contexts/ContextProvider'
import { getCode, getMessage, getPrizes } from '../api'
import Loader from './Loader'

export default function Prizes() {
    const { user, setUser } = useStateContext()

    const [qrOverlay, setQrOverlay] = useState()
    const [prizesData, setPrizesData] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        loadPrizes()
    }, [])

    useEffect(() => {
        getMessage().then(response => {
            setMessage(response.data.text)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    function loadPrizes() {
        getPrizes().then(response => {
            setPrizesData(response.data)
        })
    }

    function getValid() {
        return getItemsList(
            prizesData.filter(prize => {
                return (
                    prize.valid && !(prize.redeemed)
                )
            }))
    }

    function getNotYet() {
        return getItemsList(
            prizesData.filter(prize => {
                return (
                    !(prize.valid)
                )
            }))
    }

    function getRedeemed() {
        return getItemsList(
            prizesData.filter(prize => {
                return (
                    prize.redeemed == true
                )
            }))
    }


    function getItemsList(list) {
        return list.map((prize, index) => {
            return getPrizeListItem(prize, index)
        })
    }

    function showQrCode(id) {
        getCode(id).then(response => {
            setQrOverlay({ code: response.data.code, id: id })
        })
        setQrOverlay("loading")
    }

    function getPrizeListItem(prize, key) {
        return prize.redeemed ?
            <div key={key} className={['center', styles.listItemWrap].join(' ')} >
                <div className={['center', styles.listItem, styles.used].join(' ')} >
                    <img
                        className={[styles.qrImg].join(' ')}
                        src={qr_used} />
                    <div className={['centerVertical', styles.rightWrap].join(' ')} >
                        <div className={[styles.name].join(' ')} >
                            {prize.title}
                        </div>
                    </div>
                </div>
            </div>
            :
            <div key={key}
                className={['center', styles.listItemWrap].join(' ')}
                onClick={prize.valid ? () => showQrCode(prize.id) : null} >
                <div className={['center', styles.listItem, prize.valid ? null : styles.filter].join(' ')} >
                    <img
                        className={[styles.qrImg].join(' ')}
                        src={qrCode}
                    />
                    <div className={['centerVertical', styles.rightWrap].join(' ')} >
                        <div className={[styles.name].join(' ')} >
                            {prize.title}
                        </div>
                    </div>
                </div>
                {prize.valid ? null : <div className={[styles.progress].join(' ')} >noch {prize.points - user.score} Punkte</div>}
            </div>
    }

    function closeOverlay() {
        setQrOverlay(null)
        loadPrizes()

    }

    function getQrOverlay() {
        return (
            <div className={['center', styles.overlay].join(' ')} >
                <div className={['center', styles.bigQr].join(' ')} >
                    <img
                        className={[styles.close].join(' ')}
                        src={close}
                        onClick={closeOverlay} />
                    {qrOverlay == "loading" ?
                        <Loader></Loader>
                        :
                        <QRCodeSVG
                            className={[styles.qrCode].join(' ')}
                            value={makeQrCheckUrl(qrOverlay.code, qrOverlay.id)} />
                    }
                </div>
            </div>
        )
    }

    function makeQrCheckUrl(code, id) {
        return window.location.protocol + '//' + window.location.hostname + '/qr/' + code
    }

    return (
        <>
            {user ?
                <>
                    <div className={[styles.banner].join(' ')} >{message}</div>
                    {user.email_verified_at ?
                        <div className={['centerVertical', styles.wrap].join(' ')} >
                            {getValid()}
                            {getNotYet()}
                            <div className={[styles.redeemedLabel].join(' ')} >Bereits einglöst:</div>
                            {getRedeemed()}
                            {qrOverlay ? getQrOverlay() : null}
                        </div>
                        :
                        <div className={[styles.errorMessage].join(' ')} >Bitte verifiziere deine E-Mail um Preise einzulösen</div>}
                </>
                :
                <div className={[styles.errorMessage].join(' ')} >Bitte melde dich an um Preise zu sammeln.</div>
            }
        </>
    )
}
