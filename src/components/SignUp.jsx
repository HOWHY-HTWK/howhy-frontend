import React, { useState } from 'react'
import axiosClient from '../../axios-client.jsx'

export default function SignUp({toggleSignUp}) {
  const [signUpData, setsignUpData] = useState({ email: '', password: '', repeatPassword: '' })

    return (
        <div id="formwrapper">
            <form method="post" className="vertical" onSubmit={handleSignup}>
                <span>Registrieren</span>
                <label><input value={signUpData.email} onInput={e => setsignUpData({ ...signUpData, email: e.target.value })} type="email" name="email" placeholder='E-mail' autoComplete='username' /></label>
                <label><input value={signUpData.password} onInput={e => setsignUpData({ ...signUpData, password: e.target.value })} type="password" name="password" placeholder='Passwort' autoComplete='new-password' /></label>
                <label><input value={signUpData.repeatPassword} onInput={e => setsignUpData({ ...signUpData, repeatPassword: e.target.value })} type="password" name="repeat-password" placeholder='Passwort wiederholen' autoComplete='new-password' /></label>
                {signUpData.password != signUpData.repeatPassword ? <div className='error'>Keine übereinstimmung</div> : null}
                <button className="button" type="submit">Registrieren</button>
            </form>
            <div className='register' onClick={toggleSignUp}>Einloggen</div>
        </div>
    )

    function handleSignup(e) {
        e.preventDefault();
        axiosClient.get('/sanctum/csrf-cookie')
          .then(response => {
            let requestObject = {
              name: 'test',
              email: signUpData.email,
              password: signUpData.password,
              password_confirmation: signUpData.repeatPassword,
            }
            axiosClient.post('/register', requestObject)
              .then(response => {
                alert('Registrierung erfolgreich!')
                toggleSignUp
              }).catch((error) => {
                // debugger
                console.log(error.response)
              });
          })
      }
}
