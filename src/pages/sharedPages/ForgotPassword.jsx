import React, { createRef, useEffect, useState } from 'react'
import styles from './ForgotPassword.module.css'
import { csfrCookie, forgotPassword, resetPassword } from 'src/utils/api/api.js';
import BackButton from 'src/sharedComponents/BackButton.jsx';


export default function ForgotPassword() {
    const emailRef = createRef()

    function handleReset(e) {
        e.preventDefault();
        sendResetLink(emailRef.current.value)
    }

    function sendResetLink(email, password, remember) {
        csfrCookie().then(() => {
            forgotPassword(email).then(response => {
                console.log(response)
                alert('link wurde gesendet')
            }).catch((error) => {
                console.log(error.response)
            });
        })
    }

    return (
        <div className={[styles.formwrapper].join(' ')} >
            <BackButton></BackButton>
            <form method="post" className={[styles.vertical].join(' ')} onSubmit={handleReset}>
                <span>Passwort zurücksetzen</span>
                <input
                    className={[styles.input].join(' ')}
                    ref={emailRef}
                    type="email"
                    name="email"
                    placeholder='E-mail'
                    autoComplete='username' />
                <button className={['button'].join(' ')} type="submit">Link senden</button>
            </form>
        </div >
    )
}
