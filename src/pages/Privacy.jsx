import React from 'react'
import styles from './css/Imprint.module.css'

export default function Privacy() {
    return (
        <>
            <div className={[styles.bar].join(' ')} ></div>
            <iframe className={[styles.iframe].join(' ')} src="https://howhy.htwk-leipzig.de/info/datenschutz.html"></iframe>
        </>
    )
}
