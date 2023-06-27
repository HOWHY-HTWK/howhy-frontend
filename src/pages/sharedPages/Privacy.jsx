import React from 'react'
import styles from './Imprint.module.css'

/**
 * Displays the Privacy statement.
 * @returns 
 */
export default function Privacy() {
    return (
        <>
            <div className={[styles.bar].join(' ')} ></div>
            <iframe className={[styles.iframe].join(' ')} src="https://howhy.htwk-leipzig.de/info/datenschutz.html"></iframe>
        </>
    )
}
