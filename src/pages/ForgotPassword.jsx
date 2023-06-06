import React, { createRef, useEffect, useState } from 'react'
import axiosClient from '../../axios-client.jsx'
import { useStateContext } from '../contexts/ContextProvider.jsx';
import styles from './css/ForgotPassword.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { csfrCookie, forgotPassword, resetPassword } from '../api.js';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const backPath = location.state ? location.state.backPath : '/editor';

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
