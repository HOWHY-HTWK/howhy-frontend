import React, { createRef, useEffect, useState } from 'react'
import axiosClient from '../../axios-client.jsx'
import { useStateContext } from '../contexts/ContextProvider.jsx';
import styles from './css/Login.module.css'
import SignUp from './SignUp.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LogIn({returnSuccess = (success) => success, showEditorOption = false}) {
  const location = useLocation();
  const { user, setUser } = useStateContext()
  const navigate = useNavigate()

  const emailRef = createRef()
  const passwordRef = createRef()
  const rememberRef = createRef()
  const [remember, setRemember] = useState(false)

  const [signUp, setSignUp] = useState(false);

  function handleLogin(e) {
    e.preventDefault();    
    logIn()
  }

  function logIn(){
    axiosClient.get('/sanctum/csrf-cookie')
    .then(response => {
      axiosClient.post('/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        remember: remember
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

  function toggleSignUp() {
    setSignUp(!signUp)
  }

  return (
    <>
      {!signUp ? getLogin() : <SignUp showEditorOption={showEditorOption} toggleSignUp={toggleSignUp}></SignUp>}
    </>
  )

  function getLogin() {
    return (
      <div className={[styles.formwrapper].join(' ')} >
        <form method="post" className={[styles.vertical].join(' ')}  onSubmit={handleLogin}>
          <span>Log In</span>
          <label><input ref={emailRef} type="email" name="email" placeholder='E-mail' autoComplete='username' /></label>
          <label><input ref={passwordRef} type="password" name="password" placeholder='Passwort' autoComplete='current-password' /></label>
          <label>Angemeldet Bleiben<input checked={remember} onChange={e => setRemember(e.target.checked)} type='checkbox' name='remember'></input></label>
          <button  className={['button'].join(' ')}  type="submit">LogIn</button>
        </form>
        <div className={[styles.register].join(' ')}  onClick={toggleSignUp}> Registrieren</div>
      </div>
    )
  }

}
