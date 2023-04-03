import React from 'react'
import axios from 'axios';
import axiosClient from '../../axios-client.jsx'

export default function LogIn(signIn) {

  const handleLogin = (e) => {
    e.preventDefault();
    const email = "alex@alex.com";
    const password = "password";
    const remember = true;

    // signIn(email, password, remember)
    // .then(() => window.alert("Signed in!"))
    // .catch(() => window.alert("Incorrect email or password"))
    axiosClient.get('/sanctum/csrf-cookie')
      .then(response => {
        axiosClient.post('/login', {
          email: email,
          password: password
        }).then(response => {
          console.log(response)
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
