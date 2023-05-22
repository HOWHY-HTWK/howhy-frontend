import React, { useEffect, useRef, useState } from 'react'
import axiosClient from '../../axios-client.jsx'
import styles from './css/Login.module.css'
import { useStateContext } from '../contexts/ContextProvider.jsx'

export default function UserSignUp({ toggleSignUp, returnSuccess }) {
  const { user, setUser } = useStateContext()

  useEffect(() => {
    setsignUpData({ ...signUpData, username: makeUserName(5) })
  }, [])

  const [showAlert, setShowAlert] = useState(false)
  const [signUpData, setsignUpData] = useState({
    username: '', password: '',
    repeatPassword: '',
  })

  function handleSignup(e) {
    e.preventDefault();
    axiosClient.get('/sanctum/csrf-cookie')
      .then(response => {
        let requestObject = {
          name: signUpData.username,
          username: signUpData.username,
          password: signUpData.password,
          password_confirmation: signUpData.repeatPassword,
        }
        axiosClient.post('/api/usersignup', requestObject)
          .then(response => {
            console.log(response)
            setShowAlert(true)
          }).catch((error) => {
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
    console.log(result);
    return result;
  }

  function logIn() {
    axiosClient.get('/sanctum/csrf-cookie')
      .then(response => {
        axiosClient.post('/api/userlogin', {
          username: signUpData.username,
          password: signUpData.password,
          remember: false
        }).then(response => {
          console.log(response)
          setUser(response.data)
          returnSuccess(true)
        }).catch((error) => {
          alert(error.response.data.message)
          console.log(error.response)
        });
      })
  }

  function notePassword() {
    return (
      <div className={[styles.background, 'center'].join(' ')} >
        <div className={[styles.alert].join(' ')} >
          <div>Bitte notieren Sie sich ihre Anmeldedaten, da sie aus datenschutzrechtilen Gründen nicht wiederhergestellt werden können.</div>
          <div>Nutzername: {signUpData.username}</div>
          <div>Passwort: {signUpData.password}</div>
          <div className={['button'].join(' ')} onClick={logIn}>Ich habe die Daten notiert</div>
          <div>Sie können sich die Anmeldaten einmalig per E-Mail zusenden lassen. Die E-Mail Adresse wird dabei nicht gespeichert.</div>
          <input type="email" name="email" placeholder='E-mail' autoComplete='username'></input>
          <div className={['button'].join(' ')} >Email Senden</div>
        </div>
      </div>
    )
  }

  return (
    <div className={[styles.formwrapper].join(' ')} >
      <form method="post" className={[styles.vertical].join(' ')} onSubmit={handleSignup}>
        <span>Registrieren</span>
        <label>Nutzername: {signUpData.username}</label>
        <input
          value={signUpData.password}
          onInput={e => setsignUpData({ ...signUpData, password: e.target.value })}
          type="password"
          name="password"
          placeholder='Passwort'
          autoComplete='new-password' />
        <input
          value={signUpData.repeatPassword}
          onInput={e => setsignUpData({ ...signUpData, repeatPassword: e.target.value })}
          type="password"
          name="repeat-password"
          placeholder='Passwort wiederholen'
          autoComplete='new-password' />
        {signUpData.password != signUpData.repeatPassword ? <div className={[styles.error].join(' ')} >Keine übereinstimmung</div> : null}
        <button className={['button'].join(' ')} type="submit">Registrieren</button>
      </form>
      <div className={[styles.register].join(' ')} onClick={toggleSignUp}>Einloggen</div>
      {showAlert ? notePassword() : null}
    </div>
  )
}
