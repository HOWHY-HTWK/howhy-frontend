import React, { useEffect, useRef, useState } from 'react'
import './css/header.css'
import { useStateContext } from '../contexts/ContextProvider'
import { ReactComponent as Logo } from '../assets/howhy.svg'
// import { ReactComponent as LogoBig } from '../assets/logo_big.png'
import logoBig from '../assets/logo_big.png'
import axiosClient from '../../axios-client.jsx'
import { Link } from 'react-router-dom'
import DropDown from './DropDown'
import { MdArrowDropDown } from "react-icons/md";


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
      <div className="background" >
        <Link to={'/editor'} className='home'><img className='imgLogo' src={logoBig}></img></Link>
        <div className='user' ref={dropdownRef} onClick={handleUserClick}>
          <div className='name'>Hallo {user.name} <MdArrowDropDown></MdArrowDropDown></div>
          {isOpen ? <div className='dropDownWrapper visible'  ><DropDown></DropDown></div> :
            <div className='dropDownWrapper'  ><DropDown></DropDown></div>}
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
