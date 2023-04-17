import React, { useState } from 'react'
import axiosClient from '../../axios-client.jsx'
import styles from './css/Login.module.css'
export default function SignUp({ toggleSignUp }) {
  const [signUpData, setsignUpData] = useState({ email: '', password: '', repeatPassword: '' })

  return (
    <div className={[styles.formwrapper].join(' ')} >
      <form method="post" className={[styles.vertical].join(' ')}  onSubmit={handleSignup}>
        <span>Registrieren</span>
        <label><input value={signUpData.email} onInput={e => setsignUpData({ ...signUpData, email: e.target.value })} type="email" name="email" placeholder='E-mail' autoComplete='username' /></label>
        <label><input value={signUpData.password} onInput={e => setsignUpData({ ...signUpData, password: e.target.value })} type="password" name="password" placeholder='Passwort' autoComplete='new-password' /></label>
        <label><input value={signUpData.repeatPassword} onInput={e => setsignUpData({ ...signUpData, repeatPassword: e.target.value })} type="password" name="repeat-password" placeholder='Passwort wiederholen' autoComplete='new-password' /></label>
        {signUpData.password != signUpData.repeatPassword ? <div className={[styles.error].join(' ')} >Keine übereinstimmung</div> : null}
        <button className={['button'].join(' ')}  type="submit">Registrieren</button>
      </form>
      <div className={[styles.register].join(' ')}  onClick={toggleSignUp}>Einloggen</div>
    </div>
  )

  function handleSignup(e) {
    e.preventDefault();
    axiosClient.get('/sanctum/csrf-cookie')
      .then(response => {
        let requestObject = {
          name: makeUserName(signUpData.email),
          email: signUpData.email,
          password: signUpData.password,
          password_confirmation: signUpData.repeatPassword,
        }
        axiosClient.post('/register', requestObject)
          .then(response => {
            alert('Registrierung erfolgreich!')
            toggleSignUp()
          }).catch((error) => {
            // debugger
            alert(error.response.data.message)
          });
      })
  }

  function makeUserName(email) {
    let username = email.split("@")[0];
    let [firstName, lastName] = username.split(".");
    let formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    let formattedLastName = lastName ? lastName.charAt(0).toUpperCase() + lastName.slice(1) : '';

    return formattedFirstName + (formattedLastName ?' '+formattedLastName : '')

  }
}
