import React from 'react'
import axios from 'axios';
import axiosClient from '../../axios-client.jsx'
import { useStateContext } from '../contexts/ContextProvider.jsx';

export default function LogIn(signIn) {

  const { user, authenticated, setStatus } = useStateContext()

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
    <div>
      Log In
      <form onSubmit={handleLogin}>
        <input></input>
        <input></input>
        <button type="submit">LogIn</button>
      </form>
    </div>
  )
}
