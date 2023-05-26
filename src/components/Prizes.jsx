import React from 'react'
import styles from './css/Prizes.module.css'

import qrCode from '../assets/QR code.svg'
import qr_used from '../assets/icons/qr_used.svg'
import calendar from '../assets/icons/calendar.svg'
import location from '../assets/icons/location.svg'
import clock from '../assets/icons/clock.svg'
import calendar_white from '../assets/icons/calendar_white.svg'
import location_white from '../assets/icons/location_white.svg'
import clock_white from '../assets/icons/clock_white.svg'

export default function Prizes() {
    const prizesData = [
        {
            name: 'Kitkat',
            date: '13. - 17. Juli',
            location: 'Li 210',
            time: '12:00 -14:00',
            valid: true
        },
        {
            name: 'Kitkat',
            date: '13. - 17. Juli',
            location: 'Li 210',
            time: '12:00 -14:00',
            valid: false
        },
        {
            name: 'Kitkat',
            date: '13. - 17. Juli',
            location: 'Li 210',
            time: '12:00 -14:00',
            valid: false
        },
        {
            name: 'Kitkat',
            date: '13. - 17. Juli',
            location: 'Li 210',
            time: '12:00 -14:00',
            valid: true
        }
    ]

    const prizes = prizesData.map(prize => {
        return (
            <div className={['center', styles.listItem, !prize.valid ? styles.used : null].join(' ')} >
                {prize.valid ?
                    <div className={[styles.imgWrap].join(' ')} >
                        <img className={[styles.img].join(' ')} src={qrCode} />
                    </div>
                    :
                    <div className={[styles.imgWrap].join(' ')} >
                        <img className={[styles.img, styles.filter].join(' ')} src={qr_used} />
                    </div>
                }
                <div className={['centerVertical', styles.rightWrap].join(' ')} >
                    <div className={[styles.name].join(' ')} >{prize.name}</div>
                    <div className={[styles.info].join(' ')} >
                        <img src={prize.valid ? calendar : calendar_white}></img> {prize.date}
                    </div>
                    <div className={[styles.info].join(' ')} >
                        <img src={prize.valid ? location : location_white}></img> {prize.location}
                    </div>
                    <div className={[styles.info].join(' ')} >
                        <img src={prize.valid ? clock : clock_white}></img> {prize.time}
                    </div>
                </div>
                {/* {!prize.valid ? <div className={[styles.overlay].join(' ')} ></div> : null} */}
            </div>
        )
    })

    return (
        <div className={['centerVertical', styles.wrap].join(' ')} >
            {prizes}
        </div>
    )
}
