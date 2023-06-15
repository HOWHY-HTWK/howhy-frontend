import React, { useEffect, useState } from 'react'
import styles from './css/Prizes.module.css'

import qrCode from '../assets/QR-Code.svg'
import qr_used from '../assets/icons/qr_used.svg'
import calendar from '../assets/icons/calendar.svg'
import location from '../assets/icons/location.svg'
import clock from '../assets/icons/clock.svg'
import calendar_white from '../assets/icons/calendar_white.svg'
import location_white from '../assets/icons/location_white.svg'
import clock_white from '../assets/icons/clock_white.svg'
import close from '../assets/icons/close.svg'
import { QRCodeSVG } from 'qrcode.react'
import { useStateContext } from '../contexts/ContextProvider'
import { getCode, getPrizes } from '../api'
import Loader from './Loader'

export default function Prizes() {
    const { user, setUser } = useStateContext()

    const [qrOverlay, setQrOverlay] = useState()
    const [prizesData, setPrizesData] = useState([])

    useEffect(() => {
        loadPrizes()
    }, [])

    function loadPrizes() {
        getPrizes().then(response => {
            setPrizesData(response.data)
        })
    }

    const valid = getItemsList(
        prizesData.filter(prize => {
            return (
                prize.valid && !(prize.redeemed)
            )
        }))

    const notYet = getItemsList(
        prizesData.filter(prize => {
            return (
                !(prize.valid)
            )
        }))

    const redeemed = getItemsList(
        prizesData.filter(prize => {
            return (
                prize.redeemed == true
            )
        }))


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
                        className={[styles.img].join(' ')}
                        src={qr_used} />
                    <div className={['centerVertical', styles.rightWrap].join(' ')} >
                        <div className={[styles.name].join(' ')} >
                            {prize.title}
                        </div>
                        <div className={[styles.info].join(' ')} >
                            <img src={calendar_white}></img>
                            {prize.date}
                        </div>
                        <div className={[styles.info].join(' ')} >
                            <img src={location_white}></img>
                            {prize.place}
                        </div>
                        <div className={[styles.info].join(' ')} >
                            <img src={clock_white}></img>
                            {prize.timeframe}
                        </div>
                    </div>
                </div>
            </div>
            :
            <div key={key} className={['center', styles.listItemWrap].join(' ')} >
                <div className={['center', styles.listItem, prize.valid ? null : styles.filter].join(' ')} >
                    <img
                        className={[styles.img].join(' ')}
                        src={qrCode}
                        onClick={() => showQrCode(prize.id)} />
                    <div className={['centerVertical', styles.rightWrap].join(' ')} >
                        <div className={[styles.name].join(' ')} >
                            {prize.title}
                        </div>
                        <div className={[styles.info].join(' ')} >
                            <img src={prize.redeemed ? calendar_white : calendar}></img>
                            {prize.date}
                        </div>
                        <div className={[styles.info].join(' ')} >
                            <img src={prize.redeemed ? location_white : location}></img>
                            {prize.place}
                        </div>
                        <div className={[styles.info].join(' ')} >
                            <img src={prize.redeemed ? clock : clock_white}></img>
                            {prize.timeframe}
                        </div>
                    </div>
                </div>
                {prize.valid ? null : <div className={[styles.progress].join(' ')} >sammle noch {prize.points - user.score} Pt.</div>}
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
        <div className={['centerVertical', styles.wrap].join(' ')} >
            {user ?
                <>
                    {valid}
                    <p>Noch nicht erreicht:</p>
                    {notYet}
                    <p>Bereits einglöst:</p>
                    {redeemed}
                    {qrOverlay ? getQrOverlay() : null}
                </>
                :
                <>Bitte melden Sie sich an um Preise zu sammeln</>
            }
        </div>
    )
}
