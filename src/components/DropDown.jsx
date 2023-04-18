import React, { useEffect, useRef, useState } from 'react'
import styles from './css/DropDown.module.css'
import axiosClient from '../../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
import { Link } from 'react-router-dom'
import { MdArrowDropDown } from "react-icons/md";


export default function DropDown() {
  const { user, authenticated, setAuthenticated } = useStateContext()
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className={[styles.user].join(' ')} ref={dropdownRef} onClick={handleUserClick}>
      <div className={[styles.name].join(' ')} >Hallo {user.name} <MdArrowDropDown></MdArrowDropDown></div>
      <div className={[styles.dropDownWrapper, (isOpen ? styles.visible : null)].join(' ')}>
        <div className={[styles.wrap, "itemBackground"].join(' ')} >
          <Link to={'/editor/settings'} className={`${styles.menuListItem}`}>Einstellungen</Link>
          <div className={styles.menuListItem} onClick={logout}>Log Out</div>
        </div>
      </div>
    </div>
  )

  function handleOutsideClick(event) {
    if (!dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  function handleUserClick() {
    setIsOpen(!isOpen)
  }

  function logout() {
    axiosClient.post('/logout').then(response => {
      if (response.status === 204) {
        console.log(response)
        setAuthenticated(false);
      }
    })
  }
}
