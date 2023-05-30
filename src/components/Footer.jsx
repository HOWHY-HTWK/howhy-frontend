import React from 'react'
import styles from './css/Footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className={styles.bar}>
            <a className={[styles.link].join(' ')} href="https://discord.com/channels/1088437195532156938/1105857667920040017" target="_blank">
                Fehler melden
            </a>
            <Link to={'/user/privacy'} className={[styles.link].join(' ')} >Datenschutz</Link>
            <Link to={'/user/imprint'} className={[styles.link].join(' ')} >Impressum</Link>
        </div>
    )
}
