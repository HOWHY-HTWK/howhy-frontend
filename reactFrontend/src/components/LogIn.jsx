import React, { createRef } from 'react'
import axios from 'axios';
import axiosClient from '../../axios-client.jsx'
import { useStateContext } from '../contexts/ContextProvider.jsx';
import './css/login.css'

export default function LogIn(signIn) {
  const emailRef = createRef()
  const passwordRef = createRef()

  const { user, authenticated, setLoggedIn: setStatus } = useStateContext()

  function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target)

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const remember = formData.remember;
    
    axiosClient.get('/sanctum/csrf-cookie')
      .then(response => {
        axiosClient.post('/login', {
          email: email,
          password: password
        }).then(response => {
          console.log(response)
          setStatus(true)
        });
      })
  }

  return (
    <div id="formwrapper">
      <form method="post" className="vertical" onSubmit={handleLogin}>
        <span>Log In</span>
        <label><input ref={emailRef} type="email" name="email" placeholder='E-mail' /></label>
        <label><input ref={passwordRef} type="password" name="password" placeholder='Passwort' /></label>
        <label>Eingeloggt Bleiben<input type='checkbox' name='remember'></input></label>
        <button className="button" type="submit">LogIn</button>
      </form>
    </div>
  )
}
