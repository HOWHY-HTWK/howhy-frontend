import React, { useState } from 'react'
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

export default function Prizes() {
    const { user, setUser } = useStateContext()

    const [qrOverlay, setQrOverlay] = useState()

    const prizesData = [
        {
            name: 'Kitkat',
            date: '13. - 17. Juli',
            location: 'Li 210',
            time: '12:00 - 14:00',
            code: '239487808972135098162098734',
            valid: true
        },
        {
            name: 'Mars',
            date: '13. - 17. Juli',
            location: 'Li 210',
            time: '12:00 - 14:00',
            code: '239487808972135098162098734',
            valid: true
        },
        {
            name: 'M&M',
            date: '13. - 17. Juli',
            location: 'Li 210',
            time: '12:00 - 14:00',
            code: '239487808972135098162098734',
            valid: false
        },
        {
            name: 'Kitkat',
            date: '13. - 17. Juli',
            location: 'Li 210',
            time: '12:00 - 14:00',
            code: '239487808972135098162098734',
            valid: false
        }
    ]

    const prizes = prizesData.map((prize, index) => {
        return getPrizeListItem(prize, index)
    })

    function getPrizeListItem(prize, key) {
        return (
            <div key={key} className={['center', styles.listItem, !prize.valid ? styles.used : null].join(' ')} >
                {prize.valid ?
                    <img
                        className={[styles.img].join(' ')}
                        src={qrCode}
                        onClick={() => setQrOverlay(prize.code)} />
                    :
                    <img
                        className={[styles.img, styles.filter].join(' ')}
                        src={qr_used} />
                }
                <div className={['centerVertical', styles.rightWrap].join(' ')} >
                    <div className={[styles.name].join(' ')} >
                        {prize.name}
                    </div>
                    <div className={[styles.info].join(' ')} >
                        <img src={prize.valid ? calendar : calendar_white}></img>
                        {prize.date}
                    </div>
                    <div className={[styles.info].join(' ')} >
                        <img src={prize.valid ? location : location_white}></img>
                        {prize.location}
                    </div>
                    <div className={[styles.info].join(' ')} >
                        <img src={prize.valid ? clock : clock_white}></img>
                        {prize.time}
                    </div>
                </div>
            </div>
        )
    }

    function getQrOverlay() {
        return (
            <div className={['center', styles.overlay].join(' ')} >
                <div className={['center', styles.bigQr].join(' ')} >
                    <img
                        className={[styles.close].join(' ')}
                        src={close}
                        onClick={() => setQrOverlay(null)} />
                    <QRCodeSVG
                        className={[styles.qrCode].join(' ')}
                        value={makeQrCheckUrl(qrOverlay)} />
                </div>
            </div>
        )
    }

    function makeQrCheckUrl(code) {
        return 'http://192.168.0.164:5173/qr/' + code
    }

    return (
        <div className={['centerVertical', styles.wrap].join(' ')} >
            {user ?
                <>
                    {prizes}
                    {qrOverlay ? getQrOverlay() : null}
                </>
                :
                <>Bitte melden Sie sich an um Preise zu sammeln</>
            }
        </div>
    )
}
