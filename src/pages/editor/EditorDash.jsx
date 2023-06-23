import React, { useEffect } from 'react'
import ChannelVideoList from './ChannelVideoList'
import AllStoredVideosList from './AllStoredVideosList'
import AddVideo from './AddVideo'
import styles from './EditorDash.module.css'

export default function EditorDash() {

    useEffect(() => {
        document.title = "Dashboard";
    }, [])

    return (
        <div className={[styles.wrap].join(' ')} >
            <AllStoredVideosList title={<h2>Alle Videos für die Daten gespeichert sind: </h2>} />
            <ChannelVideoList title={<h2>Alle Videos im Howhy Channel: </h2>} />
            <div className={[styles.addVideo].join(' ')} ><AddVideo /></div>
        </div >
    )
}
