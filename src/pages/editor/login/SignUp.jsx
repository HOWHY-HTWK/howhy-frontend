import React, { useEffect, useRef, useState } from 'react'
import axiosClient from 'src/utils/api/axios-client.jsx'
import styles from './Login.module.css'

export default function SignUp({ toggleSignUp, logIn }) {
    const [info, setInfo] = useState(false)
    const infoRef = useRef()

    const [signUpData, setsignUpData] = useState({
        name: '',
        email: '', password: '',
        repeatPassword: '',
        editorRights: true
    })

    useEffect(() => {
        //set random username initially
        setsignUpData({ ...signUpData, name: makeUserName(6) })

        const handleOutsideClick = (event) => {
            if (!infoRef.current.contains(event.target)) {
                setInfo(false)
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    function handleSignup(e) {
        e.preventDefault();
        axiosClient.get('/sanctum/csrf-cookie')
            .then(response => {
                let requestObject = {
                    name: signUpData.name,
                    email: signUpData.email,
                    password: signUpData.password,
                    password_confirmation: signUpData.repeatPassword,
                    editor: signUpData.editorRights
                }
                axiosClient.post('/register', requestObject)
                    .then(response => {
                        console.log(response)
                        // alert('Registrierung erfolgreich!')
                        logIn(signUpData.email, signUpData.password, true)
                    }).catch((error) => {
                        // debugger
                        alert(error.response.data.message)
                    });
            })
    }

    function makeUserName(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for (let counter = 0; counter < length; counter++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    function getUserNameInfo() {
        return (
            <div className={[styles.infoBox, info ? styles.visible : null].join(' ')} >
                Es wird automatisch ein anonymer Benutzername generiert.
                Dieser kann allerdings wie gewünscht angepasst werden.
            </div>
        )
    }

    function handleInfoClick() {
        setInfo(prev => !prev)
    }

    return (
        <div className={[styles.formwrapper].join(' ')} >
            <form method="post" className={[styles.vertical].join(' ')} onSubmit={handleSignup}>
                <span>Registrieren</span>
                <div className={[styles.label].join(' ')} >
                    <div>Benutzername
                        <span ref={infoRef}
                            className={[styles.info].join(' ')}
                            onClick={handleInfoClick}>
                            &#9432; {getUserNameInfo()}
                        </span>
                    </div>
                    <input
                        id="username"
                        className={[styles.input].join(' ')}
                        value={signUpData.name}
                        onInput={e => setsignUpData({ ...signUpData, name: e.target.value })}
                        type="username"
                        name="username"
                        placeholder='Benutzername'
                        autoComplete='off' />
                </div>
                <div className={[styles.label].join(' ')} >
                    <div className={[signUpData.email == '' ? styles.hidden : null].join(' ')} >
                        E-Mail
                    </div>
                    <input
                        className={[styles.input].join(' ')}
                        value={signUpData.email}
                        onInput={e => setsignUpData({ ...signUpData, email: e.target.value })}
                        type="email"
                        name="email"
                        placeholder='E-mail'
                        autoComplete='email' />
                </div>
                <div className={[styles.label].join(' ')} >
                    <div className={[signUpData.password == '' ? styles.hidden : null].join(' ')}>
                        Passwort
                    </div>
                    <input
                        className={[styles.input].join(' ')}
                        value={signUpData.password}
                        onInput={e => setsignUpData({ ...signUpData, password: e.target.value })}
                        type="password"
                        name="password"
                        placeholder='Passwort'
                        autoComplete='new-password' />
                </div>
                <div className={[styles.label].join(' ')} >
                    <div className={[signUpData.repeatPassword == '' ? styles.hidden : null].join(' ')} >
                        Passwort wiederholen
                    </div>
                    <input
                        className={[styles.input].join(' ')}
                        value={signUpData.repeatPassword}
                        onInput={e => setsignUpData({ ...signUpData, repeatPassword: e.target.value })}
                        type="password"
                        name="repeat-password"
                        placeholder='Passwort wiederholen'
                        autoComplete='new-password' />
                </div>
                {
                    signUpData.password != signUpData.repeatPassword ?
                        <div className={[styles.error].join(' ')} >Keine übereinstimmung</div>
                        : null
                }
                <label className={[styles.requestRights].join(' ')} >
                    <input
                        checked={signUpData.editorRights}
                        onChange={() => setsignUpData({ ...signUpData, editorRights: !signUpData.editorRights })}
                        type='checkbox'></input>
                    Rechte zum Bearbeiten von Videos anfordern</label>
                <button className={['button'].join(' ')} type="submit">Registrieren</button>
            </form >
            <div className={[styles.register].join(' ')} onClick={toggleSignUp}>Einloggen</div>
        </div >
    )
}
