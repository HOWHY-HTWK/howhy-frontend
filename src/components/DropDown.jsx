import React from 'react'
import styles from './css/DropDown.module.css'
import axiosClient from '../../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

export default function DropDown() {
  const { user, authenticated, setAuthenticated: setLoggedIn } = useStateContext()

  return (
    <div className={styles.wrap}>
      <div className={styles.menuListItem}>Einstellungen</div>
      <div className={styles.menuListItem} onClick={logout}>Log Out</div>
    </div>
  )

  function logout() {
    axiosClient.post('/logout').then(response => {
      if (response.status === 204) {
        console.log(response)
        setLoggedIn(false);
      }
    })
  }
}
