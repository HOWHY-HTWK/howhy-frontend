import React, { useRef, useState } from 'react'
import './css/header.css'
import { useStateContext } from '../contexts/ContextProvider'
import { ReactComponent as Logo } from '../assets/howhy.svg'
import axiosClient from '../../axios-client.jsx'
import { Link } from 'react-router-dom'
import DropDown from './DropDown'

export default function Header() {
  const { user, authenticated, setAuthenticated } = useStateContext()
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  document.addEventListener('click', handleOutsideClick);

  return (
    <div>
      <div className="background" >
        <Link to={'/editor'} className='home'><Logo id="logo" ></Logo></Link>
        <div className='user' ref={dropdownRef} onClick={handleUserClick}>
          <div className='name'>Hallo {user.name} ▼</div>
        </div>
        {isOpen ? <div className='dropDownWrapper'  ><DropDown></DropDown></div> : null}
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
