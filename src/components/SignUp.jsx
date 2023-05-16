import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client.jsx'
import styles from './css/Login.module.css'
import { useStateContext } from '../contexts/ContextProvider.jsx'

export default function SignUp({ toggleSignUp, showEditorOption = false }) {
  const { user, setUser } = useStateContext()

  const [signUpData, setsignUpData] = useState({
    name: makeUserName(6),
    email: '', password: '',
    repeatPassword: '',
    editorRights: showEditorOption ? true : false
  })

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
            logIn()
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
    console.log(result);
    return result;
  }

  function logIn() {
    axiosClient.get('/sanctum/csrf-cookie')
      .then(response => {
        axiosClient.post('/login', {
          email: signUpData.email,
          password: signUpData.password,
          remember: false
        }).then(response => {
          console.log(response)
          setUser(response.data)
        }).catch((error) => {
          alert(error.response.data.message)
          console.log(error.response)
        });
      })
  }

  return (
    <div className={[styles.formwrapper].join(' ')} >
      <form method="post" className={[styles.vertical].join(' ')} onSubmit={handleSignup}>
        <span>Registrieren</span>
        <input
        className={[styles.input].join(' ')} 
          value={signUpData.name}
          onInput={e => setsignUpData({ ...signUpData, name: e.target.value })}
          type="username"
          name="username"
          placeholder='Benutzername'
          autoComplete='username' />
        <input
        className={[styles.input].join(' ')} 
          value={signUpData.email}
          onInput={e => setsignUpData({ ...signUpData, email: e.target.value })}
          type="email"
          name="email"
          placeholder='E-mail'
          autoComplete='username' />
        <input
        className={[styles.input].join(' ')} 
          value={signUpData.password}
          onInput={e => setsignUpData({ ...signUpData, password: e.target.value })}
          type="password"
          name="password"
          placeholder='Passwort'
          autoComplete='new-password' />
        <input
        className={[styles.input].join(' ')} 
          value={signUpData.repeatPassword}
          onInput={e => setsignUpData({ ...signUpData, repeatPassword: e.target.value })}
          type="password"
          name="repeat-password"
          placeholder='Passwort wiederholen'
          autoComplete='new-password' />
        {signUpData.password != signUpData.repeatPassword ? <div className={[styles.error].join(' ')} >Keine übereinstimmung</div> : null}
        {showEditorOption ?
          <label className={[styles.requestRights].join(' ')} >
            <input
              checked={signUpData.editorRights}
              onChange={() => setsignUpData({ ...signUpData, editorRights: !signUpData.editorRights })}
              type='checkbox'></input>
            Rechte zum Bearbeiten von Videos anfordern</label> : null}
        <button className={['button'].join(' ')} type="submit">Registrieren</button>
      </form>
      <div className={[styles.register].join(' ')} onClick={toggleSignUp}>Einloggen</div>
    </div>
  )
}
