import React, { useEffect, useRef, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { ReactComponent as Logo } from '../assets/howhy.svg'
// import { ReactComponent as LogoBig } from '../assets/logo_big.png'
import logoBig from '../assets/logo_big.png'
import axiosClient from '../../axios-client.jsx'
import { Link } from 'react-router-dom'
import DropDown from './DropDown'
import styles from './css/Header.module.css'

export default function Header({ editorMode, children }) {
  return (
      <div className={[styles.background, editorMode ? styles.editorBackground : ''].join(' ')} >
        <Link to={editorMode ? '/editor' : '/'} className={[styles.home].join(' ')} ><img className={[styles.imgLogo].join(' ')} src={logoBig}></img></Link>
        {children}
      </div>
  )
}
