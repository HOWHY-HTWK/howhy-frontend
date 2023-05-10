import React from 'react'
import styles from './css/Footer.module.css'

export default function Footer() {
    return (
        <div className={styles.bar}>
            {/* <a href="mailto:alexander.bonin@htwk-leipzig.de?subject=Howhy Editor Fehler">
                Fehler melden
            </a> */}
            <a href="https://discord.com/channels/1088437195532156938/1105857667920040017" target="_blank">
                Fehler melden
            </a>
        </div>
    )
}
