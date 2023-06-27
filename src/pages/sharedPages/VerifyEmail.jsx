import React from 'react'
import { useStateContext } from 'src/contexts/ContextProvider'
import styles from './VerifyEmail.module.css'
import axiosClient from 'src/utils/api/axios-client'

/**
 * This Page is displayed on Pages where a e-mail verification is mandatory. 
 * @returns 
 */
export default function VerifyEmail() {
    const { user, setUser, updateUserData } = useStateContext()

    function resendLink() {
        axiosClient.post('/email/verification-notification').then(response => {
            alert('Ein neuer Link wurde gesendet')
        })
    }

    return (
        <div className={['center', styles.mail].join(' ')} >
            Bitte verifizieren sie ihre E-mail adresse und drücken sie dann auf "Weiter"
            <button className={['button'].join(' ')} onClick={resendLink}>Link erneut senden</button>
            <button className={['button'].join(' ')} onClick={updateUserData}>Weiter</button>
        </ div>
    )
}
