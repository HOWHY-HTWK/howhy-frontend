import React from 'react'
import './css/header.css'
import { useStateContext } from '../contexts/ContextProvider'
import Logo from '../assets/howhy.svg'

export default function Header() {
    const {user, authenticated, setStatus} = useStateContext()

  return (
    <div className="background">
        <Logo></Logo>
        <button className='button' onClick={logout}>Log Out</button>
    </div>
  )

  function logout(){
    setStatus(false)
  }
}
