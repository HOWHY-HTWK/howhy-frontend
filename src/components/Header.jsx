import React from 'react'
import './css/header.css'
import { useStateContext } from '../contexts/ContextProvider'
import {ReactComponent as Logo} from '../assets/howhy.svg'
import axiosClient from '../../axios-client.jsx'
import { Link } from 'react-router-dom'

export default function Header() {
    const {user, authenticated, setLoggedIn} = useStateContext()

  return (
    <div className="background">
        <Link to={'/editor'}><Logo id="logo" ></Logo></Link>
        <button className='button' onClick={logout}>Log Out</button>
    </div>
  )

  function logout(){
    axiosClient.post('/logout').then(response => {
      if (response.status === 204) {
        console.log(response)
        setLoggedIn(false);
      }
  })
  }
}
