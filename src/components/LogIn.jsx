import React, { createRef, useEffect, useState } from 'react'
import axiosClient from '../../axios-client.jsx'
import { useStateContext } from '../contexts/ContextProvider.jsx';
import styles from './css/Login.module.css'
import SignUp from './SignUp.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LogIn({returnSuccess}) {
  const location = useLocation();
  const { user, authenticated, setUser } = useStateContext()
  const navigate = useNavigate()

  const emailRef = createRef()
  const passwordRef = createRef()

  const [signUp, setSignUp] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    let formData = new FormData(e.target)
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    axiosClient.get('/sanctum/csrf-cookie')
      .then(response => {
        axiosClient.post('/login', {
          email: email,
          password: password
        }).then(response => {
          console.log(response)
          setUser(response.data)
          returnSuccess(true)
        }).catch((error) => {
          alert(error.response.data.message)
        });
      })
  }

  function toggleSignUp() {
    setSignUp(!signUp)
  }

  return (
    <>
      {!signUp ? getLogin() : <SignUp toggleSignUp={toggleSignUp}></SignUp>}
    </>
  )

  function getLogin() {
    return (
      <div className={[styles.formwrapper].join(' ')} >
        <form method="post" className={[styles.vertical].join(' ')}  onSubmit={handleLogin}>
          <span>Log In</span>
          <label><input ref={emailRef} type="email" name="email" placeholder='E-mail' autoComplete='username' /></label>
          <label><input ref={passwordRef} type="password" name="password" placeholder='Passwort' autoComplete='current-password' /></label>
          {/* <label>Eingeloggt Bleiben<input type='checkbox' name='remember'></input></label> */}
          <button className={['button'].join(' ')}  type="submit">LogIn</button>
        </form>
        <div className={[styles.register].join(' ')}  onClick={toggleSignUp}> Registrieren</div>
      </div>
    )
  }

}
