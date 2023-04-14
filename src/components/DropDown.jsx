import React from 'react'
import styles from './css/DropDown.module.css'
import axiosClient from '../../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
import { Link } from 'react-router-dom'

export default function DropDown() {
  const { user, authenticated, setAuthenticated: setLoggedIn } = useStateContext()

  return (
    <div className={styles.wrap}>
      <Link to={'/editor/settings'} className={styles.menuListItem}>Einstellungen</Link>
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
