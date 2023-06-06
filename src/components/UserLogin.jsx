import React, { createRef, useEffect, useState } from 'react'
import axiosClient from '../../axios-client.jsx'
import { useStateContext } from '../contexts/ContextProvider.jsx';
import styles from './css/UserLogin.module.css'
import SignUp from './SignUp.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

import howhyLogo from '../assets/login_logo.svg'
import info from '../assets/infographic.svg'
import background from '../assets/Muster.svg'
import UserSignUp from './UserSignUp.jsx';

export default function UserLogIn({ showEditorOption = false }) {
    const navigate = useNavigate();

    const { user, setUser } = useStateContext()
    const [message, setMessage] = useState('');

    const emailRef = createRef()
    const passwordRef = createRef()

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [remember, setRemember] = useState(true)

    const [signUp, setSignUp] = useState(false);

    function handleLogin(e) {
        e.preventDefault();
        logIn(loginData.email, loginData.password, remember)
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
                    navigate(-1)
                }).catch((error) => {
                    setMessage(<span style={{ color: 'red' }}>{error.response.data.message}</span>)
                    console.log(error.response)
                });
            })
    }

    function toggleSignUp() {
        setSignUp(!signUp)
    }

    function getLoginForm() {
        return (
            <div className={[styles.formwrapper].join(' ')} >
                <form method="post" className={[styles.form].join(' ')} onSubmit={handleLogin}>
                    <div className={[styles.label].join(' ')} >
                        <div className={[styles.labelText, loginData.email == '' ? styles.hidden : null].join(' ')} >E-Mail</div>
                        <input
                            className={[styles.input].join(' ')}
                            ref={emailRef}
                            value={loginData.email}
                            onInput={e => setLoginData({ ...loginData, email: e.target.value })}
                            type="email"
                            name="email"
                            placeholder='E-mail'
                            autoComplete='username' />
                    </div>
                    <div className={[styles.label].join(' ')} >
                        <div className={[styles.labelText, loginData.password == '' ? styles.hidden : null].join(' ')} >Passwort</div>
                        <input
                            className={[styles.input].join(' ')}
                            ref={passwordRef}
                            value={loginData.password}
                            onInput={e => setLoginData({ ...loginData, password: e.target.value })}
                            type="password"
                            name="password"
                            placeholder='Passwort'
                            autoComplete='current-password' />
                    </div>
                    <div className={[styles.forgot].join(' ')}
                        onClick={() => navigate('/forgot-password')}>
                        Passwort vergessen?
                    </div>
                    {message != '' ?
                        <div className={[styles.message].join(' ')} >{message} </div>
                        :
                        <div className={[styles.message, styles.invisible].join(' ')} ></div>
                    }
                    <button className={['button', styles.loginButton].join(' ')} type="submit">Einloggen</button>
                </form>
                <div className={[styles.register].join(' ')} onClick={toggleSignUp}> Registrieren</div>
            </div>
        )
    }

    return (
        <div className={[styles.wrap].join(' ')}
            style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }} >
            <img className={[styles.logo].join(' ')} src={howhyLogo} ></img>
            {!signUp ? <img className={[styles.infoGraphic].join(' ')} src={info} ></img> : null}
            {!signUp ? getLoginForm() : <UserSignUp showEditorOption={showEditorOption}
                toggleSignUp={toggleSignUp}
                logIn={logIn} />}
        </div>
    )
}
