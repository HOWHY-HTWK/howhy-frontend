import React, { useEffect, useState } from 'react'
import styles from './AddPrizes.module.css'
import { deletePrize, getMessage, getPrizes, postMessage, postPrize, updatePrize } from 'src/utils/api/api';

// import qrCode from 'src/assets/QR-Code.svg'
// import qr_used from 'src/assets/icons/qr_used.svg'
// import calendar from 'src/assets/icons/calendar.svg'
// import location from 'src/assets/icons/location.svg'
// import clock from 'src/assets/icons/clock.svg'
// import calendar_white from 'src/assets/icons/calendar_white.svg'
// import location_white from 'src/assets/icons/location_white.svg'
// import clock_white from 'src/assets/icons/clock_white.svg'
// import close from 'src/assets/icons/close.svg'

export default function AddPrizes() {

    const [prizeList, setPrizeList] = useState([])
    const list = getItemsList(prizeList)

    const [message, setMessage] = useState('')

    const [prizeData, setPrizeData] = useState({
        title: '',
        points: '',
    })

    useEffect(() => {
        loadPrizes()
        getMessage().then(response => {
            setMessage(response.data.text)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    function loadPrizes() {
        getPrizes().then(response => {
            setPrizeList(response.data)
        })
    }

    function saveMessage() {
        postMessage({ text: message }).then(response => {
            alert('nachricht gespeichert!')
        })
    }

    function getItemsList(list) {
        return list.map((prize, index) => {
            return getPrizeListItem(prize, index)
        })
    }


    function handleSave(e) {
        e.preventDefault();

        postPrize(prizeData).then(response => {
            loadPrizes()
            alert('erfolgreich gespeichert')
            console.log(response)
        }).catch(error => {
            console.log(error.response.data.message)
        })
    }

    function removePrize(id) {
        if (confirm('Diese Preis wirklich löschen?')) {
            deletePrize(id).then(response => {
                loadPrizes()
            })
        }
    }

    function handleUpdate(e, id) {
        e.preventDefault();
        let request = {
            title: e.target.title.value,
            points: e.target.points.value,
        }
        updatePrize(id, request).then(response => {
            alert('erfolgreich gespeichert')
            loadPrizes()
        })
    }

    function getPrizeListItem(prize, key) {
        return (
            <div key={key} >
                <form method="post" className={['center', styles.listItem].join(' ')} onSubmit={e => handleUpdate(e, prize.id)}>
                    <input
                        name='title'
                        className={[styles.input, styles.name].join(' ')}
                        defaultValue={prize.title}
                        type="text"
                        placeholder='Title'
                    />
                    <input
                        name='points'
                        className={[styles.input].join(' ')}
                        defaultValue={prize.points}
                        type="text"
                        placeholder='Points'
                    />
                    <div className={[styles.delete].join(' ')}
                        onClick={() => removePrize(prize.id)}> X</div>
                    <button className={[styles.save].join(' ')} type="submit">✓</button>
                </form >
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
                            className={[styles.input].join(' ')}
                            value={prizeData.title}
                            onInput={e => setPrizeData({ ...prizeData, title: e.target.value })}
                            type="text"
                            placeholder='Title'
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
