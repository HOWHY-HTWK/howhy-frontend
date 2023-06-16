import React, { useEffect, useState } from 'react'
import styles from './css/AddPrizes.module.css'
import { getMessage, getPrizes, postMessage, postPrize } from '../api';

import qrCode from '../assets/QR-Code.svg'
import qr_used from '../assets/icons/qr_used.svg'
import calendar from '../assets/icons/calendar.svg'
import location from '../assets/icons/location.svg'
import clock from '../assets/icons/clock.svg'
import calendar_white from '../assets/icons/calendar_white.svg'
import location_white from '../assets/icons/location_white.svg'
import clock_white from '../assets/icons/clock_white.svg'
import close from '../assets/icons/close.svg'

export default function AddPrizes() {

    const [prizeList, setPrizeList] = useState([])
    const [message, setMessage] = useState('');

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

    function saveMessage() {
        postMessage({ text: message }).then(response => {
            alert('nachricht gespeichert!')
        })
    }

    function loadPrizes() {
        getPrizes().then(response => {
            setPrizeList(response.data)
        })
    }

    function getItemsList(list) {
        return list.map((prize, index) => {
            return getPrizeListItem(prize, index)
        })
    }

    const list = getItemsList(prizeList)

    const [prizeData, setPrizeData] = useState({
        title: '',
        date: '',
        place: '',
        timeframe: '',
        points: '',
    })

    function handleSave(e) {
        e.preventDefault();

        postPrize(prizeData).then(response => {
            loadPrizes()
            alert('erfolgreich gespeichert')
            console.log(response)
        })
    }

    function getPrizeListItem(prize, key) {
        return (
            <div key={key} className={['center', styles.listItem, !prize.valid ? styles.used : null].join(' ')} >
                <div className={[styles.name].join(' ')} >
                    {prize.title}
                </div>
                <div className={['centerVertical', styles.rightWrap].join(' ')} >
                    <div className={[styles.info].join(' ')} >
                        <img src={calendar}></img>
                        {prize.date}
                    </div>
                    <div className={[styles.info].join(' ')} >
                        <img src={location}></img>
                        {prize.place}
                    </div>
                    <div className={[styles.info].join(' ')} >
                        <img src={clock}></img>
                        {prize.timeframe}
                    </div>
                </div>
            </div >
        )
    }

    return (
        <div className={['centerVertical'].join(' ')} >
            <div className={[styles.formwrapper].join(' ')} >
                <form method="post" className={[styles.vertical].join(' ')} onSubmit={handleSave}>
                    <span>Preis Hinzufügen</span>
                    <div className={[styles.label].join(' ')} >
                        <div>Title
                        </div>
                        <input
                            id="username"
                            className={[styles.input].join(' ')}
                            value={prizeData.title}
                            onInput={e => setPrizeData({ ...prizeData, title: e.target.value })}
                            type="text"
                            placeholder='Title'
                        />
                    </div>
                    <div className={[styles.label].join(' ')} >
                        <div className={[prizeData.date == '' ? styles.hidden : null].join(' ')} >Zeitraum</div>
                        <input
                            className={[styles.input].join(' ')}
                            value={prizeData.date}
                            onInput={e => setPrizeData({ ...prizeData, date: e.target.value })}
                            type="text"
                            placeholder='Zeitraum'
                        />
                    </div>
                    <div className={[styles.label].join(' ')} >
                        <div className={[prizeData.password == '' ? styles.hidden : null].join(' ')}>Ort</div>
                        <input
                            className={[styles.input].join(' ')}
                            value={prizeData.place}
                            onInput={e => setPrizeData({ ...prizeData, place: e.target.value })}
                            type="text"
                            placeholder='Ort'
                        />
                    </div>
                    <div className={[styles.label].join(' ')} >
                        <div className={[prizeData.timeframe == '' ? styles.hidden : null].join(' ')} >Zeitraum</div>
                        <input
                            className={[styles.input].join(' ')}
                            value={prizeData.timeframe}
                            onInput={e => setPrizeData({ ...prizeData, timeframe: e.target.value })}
                            type="text"
                            placeholder='Zeitraum'
                        />
                    </div>
                    <div className={[styles.label].join(' ')} >
                        <div className={[prizeData.points == '' ? styles.hidden : null].join(' ')} >Punkte</div>
                        <input
                            className={[styles.input].join(' ')}
                            value={prizeData.points}
                            onInput={e => setPrizeData({ ...prizeData, points: e.target.value })}
                            type="text"
                            placeholder='Punkte'
                        />
                    </div>
                    <button className={['button'].join(' ')} type="submit">Speichern</button>
                </form >
            </div >
            <div className={['centerVertical', styles.wrap].join(' ')} >{
                list}
            </div>
            <div className={['centerVertical', styles.messageWrap].join(' ')} >
                <textarea
                    cols={"40"}
                    rows={"5"}
                    className={[styles.input, styles.messageInput].join(' ')}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    type="text"
                    placeholder='Nachricht'
                />
                <div className={['button'].join(' ')} onClick={saveMessage}>Nachricht Speichern</div>
            </div>
        </div>
    )
}
