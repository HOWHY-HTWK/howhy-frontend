import React, { useState } from 'react'
import styles from './VerifyEmailBanner.module.css'
import axiosClient from 'src/utils/api/axios-client'
import { MdClose } from 'react-icons/md'

export default function VerifyEmailBanner() {

    const [closed, setClosed] = useState(false)

    function resendLink() {
        axiosClient.post('/email/verification-notification').then(response => {
            alert('Ein neuer Link wurde gesendet')
        })
    }

    return (
        <div className={[styles.wrap, closed ? styles.closed : null].join(' ')} >
            <div className={[styles.closeWrap].join(' ')} onClick={() => setClosed(true)}>
                <MdClose></MdClose>
            </div>
            <div className={['center', styles.content].join(' ')} >
                <div>Bitte verifiziere deine E-Mail Adresse um alle Funktionen nutzen zu können</div>
                <button className={['button'].join(' ')} onClick={resendLink}>Link erneut senden</button>
            </div>
        </div>
    )
}