import React, { createRef, useEffect, useState } from 'react'
import axiosClient from 'src/utils/api/axios-client.jsx'
import { useStateContext } from 'src/contexts/ContextProvider.jsx';
import styles from './ForgotPassword.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { csfrCookie, resetPassword } from 'src/utils/api/api.js';

export default function ResetPassword() {
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search)
    const email = queryParameters.get("email")
    const token = queryParameters.get('token')

    const passwordRef = createRef()
    const repeatPasswordRef = createRef()

    function handleSetNewPassword(e) {
        e.preventDefault();
        setNewPassword(passwordRef.current.value, repeatPasswordRef.current.value)
    }

    function setNewPassword(password, repeatPassword) {
        csfrCookie()
            .then(response => {
                console.log(email + '|' + password + '|' + repeatPassword + '|' + token)
                resetPassword(email, password, repeatPassword, token).then(response => {
                    console.log(response)
                    navigate('/login')
                }).catch((error) => {
                    alert(error.response.data.message)
                    console.log(error.response)
                });
            })
    }

    return (
        <div className={[styles.formwrapper].join(' ')} >
            <form method="post" className={[styles.vertical].join(' ')} onSubmit={handleSetNewPassword}>
                <span>Neues Passwort eingeben</span>
                <input
                    className={[styles.input].join(' ')}
                    ref={passwordRef}
                    type="password"
                    name="password"
                    placeholder='Passwort'
                    autoComplete='new-password' />
                <input
                    className={[styles.input].join(' ')}
                    ref={repeatPasswordRef}
                    type="password"
                    name="repeat-password"
                    placeholder='Passwort wiederholen'
                    autoComplete='new-password' />
                <button className={['button'].join(' ')} type="submit">Neues Passwort speichern</button>
            </form>
        </div>
    )
}
