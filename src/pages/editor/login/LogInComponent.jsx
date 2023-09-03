import React, { createRef, useEffect, useState } from 'react'
import axiosClient from 'src/utils/api/axios-client.jsx'
import { useStateContext } from 'src/contexts/ContextProvider.jsx';
import styles from './Login.module.css'

export default function LogInComponent({ successCallback }) {
    const { user, setUser } = useStateContext()

    const emailRef = createRef()
    const passwordRef = createRef()
    const [remember, setRemember] = useState(false)

    function handleLogin(e) {
        e.preventDefault();
        logIn(emailRef.current.value, passwordRef.current.value, remember)
    }

    function logIn(email, password, remember) {
        axiosClient.get('/sanctum/csrf-cookie')
            .then(response => {
                axiosClient.post('/login', {
                    email: email,
                    password: password,
                    remember: remember
                }).then(response => {
                    console.log(response)
                    setUser(response.data)
                    successCallback()
                }).catch((error) => {
                    alert(error.response.data.message)
                    console.log(error.response)
                });
            })
    }

    function getLogin() {
        return (
            <div className={[styles.formwrapper].join(' ')} >
                <form method="post" className={[styles.vertical].join(' ')} onSubmit={handleLogin}>
                    <span>Log In</span>
                    <input
                        className={[styles.input].join(' ')}
                        ref={emailRef}
                        type="email"
                        name="email"
                        placeholder='E-mail'
                        autoComplete='username' />
                    <input
                        className={[styles.input].join(' ')}
                        ref={passwordRef}
                        type="password"
                        name="password"
                        placeholder='Passwort'
                        autoComplete='current-password' />
                    <button className={['button'].join(' ')} type="submit">LogIn</button>
                </form>
                <div className={[styles.forgot].join(' ')}
                    onClick={() => navigate('/forgot-password')}>
                    Passwort vergessen?
                </div>
            </div>
        )
    }

    return (
        getLogin()
    )
}
