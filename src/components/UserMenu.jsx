import React, { useState } from 'react'
import { MdMenu } from 'react-icons/md'
import styles from './css/UserMenu.module.css'
import { useStateContext } from '../contexts/ContextProvider'
import { useNavigate } from 'react-router-dom'

export default function UserMenu() {
  const { user, authenticated, setUser, setAuthenticated } = useStateContext()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      {user ?
        <div className={[styles.wrap, 'center'].join(' ')} >
          <MdMenu onClick={() => setOpen(!open)} className={[styles.icon].join(' ')} ></MdMenu>
          {open ? getMenu() : null}
        </div>
        : <div className={['button', 'center', styles.logIn].join(' ')} onClick={() => navigate('/login', {state:{back:'/'}})} >Log In</div>
        }
    </>
  )

  function getMenu() {
    return (
      <div className={[styles.menu].join(' ')} >
        <div className={['button'].join(' ')} onClick={() => setUser(null)}>Log Out</div>
      </div>
    )
  }
}
