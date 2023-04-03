import React from 'react'
import axios from 'axios';
import axiosClient from '../../axios-client.jsx'
import { useStateContext } from '../contexts/ContextProvider.jsx';
import './css/login.css'

export default function LogIn(signIn) {

  const { user, authenticated, setLoggedIn: setStatus } = useStateContext()

  const handleLogin = (e) => {
    e.preventDefault();
    const email = "alex@alex.com";
    const password = "password";
    const remember = true;

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
      Log In
      <form className="vertical" onSubmit={handleLogin}>
        <label>E-Mail<input name="email"/></label>
        <label>Passwort<input name="password"/></label>
        <button type="submit">LogIn</button>
      </form>
    </div>
  )
}
