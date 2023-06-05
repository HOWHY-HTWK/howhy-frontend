import React, { createRef, useEffect, useState } from 'react'
import axiosClient from '../../axios-client.jsx'
import { useStateContext } from '../contexts/ContextProvider.jsx';
import styles from './css/ForgotPassword.module.css'
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const navigate = useNavigate();

    const passwordRef = createRef()
    const repeatPasswordRef = createRef()

    function handleSetNewPassword(e) {
        e.preventDefault();
        setNewPassword(passwordRef.current.value, repeatPasswordRef.value)
    }

    function setNewPassword(password, repeatPassword) {
        axiosClient.get('/sanctum/csrf-cookie')
            .then(response => {
                axiosClient.post('/reset-password', {
                    password: password,
                    password_confirmation: repeatPassword
                }).then(response => {
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
                    autoComplete='current-password' />
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
