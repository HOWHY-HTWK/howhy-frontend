import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import styles from './css/VerifyEmail.module.css'
import axiosClient from '../../axios-client'

export default function VerifyEmail() {
    const { user, setUser } = useStateContext()
    
    function refreshUser() {
        axiosClient.get('/api/user').then(response => {
            setUser(response.data)
        })
    }

    function resendLink() {
        axiosClient.post('/email/verification-notification').then(response => {
            alert('Ein neuer Link wurde gesendet')
        })
    }

    return (
        <div className={['center', styles.mail].join(' ')} >
            Bitte verifizieren sie ihre E-mail adresse und drücken sie dann auf "Weiter"
            <button className={['button'].join(' ')} onClick={resendLink}>Link erneut senden</button>
            <button className={['button'].join(' ')} onClick={refreshUser}>Weiter</button>
        </ div>
    )
}
