import React, { useEffect, useRef, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { ReactComponent as Logo } from '../assets/howhy.svg'
// import { ReactComponent as LogoBig } from '../assets/logo_big.png'
import logoBig from '../assets/logo_big.png'
import axiosClient from '../../axios-client.jsx'
import { Link } from 'react-router-dom'
import DropDown from './DropDown'
import { MdArrowDropDown } from "react-icons/md";
import styles from './css/Header.module.css'


export default function Header() {
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
    <div>
      <div className={[styles.background].join(' ')}  >
        <Link to={'/editor'} className={[styles.home].join(' ')} ><img className={[styles.imgLogo].join(' ')}  src={logoBig}></img></Link>
        <div className={[styles.user].join(' ')}  ref={dropdownRef} onClick={handleUserClick}>
          <div className={[styles.name].join(' ')} >Hallo {user.name} <MdArrowDropDown></MdArrowDropDown></div>
          {isOpen ? <div className={[styles.dropDownWrapper, styles.visible].join(' ')}   ><DropDown></DropDown></div> :
            <div className={[styles.dropDownWrapper].join(' ')}   ><DropDown></DropDown></div>}
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
}
