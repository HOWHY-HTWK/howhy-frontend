import React, { useState } from 'react'
import { MdMenu } from 'react-icons/md'
import styles from './css/UserMenu.module.css'
import { useStateContext } from '../contexts/ContextProvider'
import { useNavigate } from 'react-router-dom'
import * as utils from '../utils'

export default function UserMenu({ setLoginActive }) {
  const { user, setUser } = useStateContext()
  const [open, setOpen] = useState(false)

  function getMenu() {
    return (
      <div className={[styles.menu, open ? styles.menuOpen : ''].join(' ')} >
        <div className={[styles.menuListItem].join(' ')} onClick={() => { }}>Einstellungen</div>
        <div className={[styles.userName, styles.menuListItem].join(' ')} >Eingeloggt als: {user.name}</div>
        <div className={[styles.menuListItem].join(' ')} onClick={() => utils.logout(setUser)}>Log Out</div>
      </div>
    )
  }

  return (
    <>
      {user ?
        <div className={[styles.wrap, 'center'].join(' ')} >
          <MdMenu onClick={() => setOpen(prev => !prev)} className={[styles.icon].join(' ')} ></MdMenu>
          {getMenu()}
        </div>
        : <div className={['button', 'center', styles.logIn].join(' ')} onClick={() => setLoginActive(true)} >Log In</div>
      }
    </>
  )
}
