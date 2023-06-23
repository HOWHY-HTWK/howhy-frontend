import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import styles from './Imprint.module.css'

export default function Imprint() {



    return (
        <>
            <div className={[styles.bar].join(' ')} ></div>
            <iframe className={[styles.iframe].join(' ')} src="https://howhy.htwk-leipzig.de/info/impressum.html"></iframe>
        </>
    )
}
