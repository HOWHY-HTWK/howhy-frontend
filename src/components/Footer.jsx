import React from 'react'
import styles from './css/Footer.module.css'

export default function Footer() {
    return (
        <div className={styles.bar}>
            <a href="mailto:alexander.bonin@htwk-leipzig.de?subject=Howhy Editor Fehler">
                Fehler melden
            </a>
        </div>
    )
}
