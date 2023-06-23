import React, { useEffect, useRef, useState } from 'react'
import logoBig from 'src/assets/logo_big.png'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header({ editorMode, children }) {
    return (
        <div className={[styles.background, editorMode ? styles.editorBackground : ''].join(' ')} >
            <Link to={editorMode ? '/editor' : '/'} className={[styles.home].join(' ')} >
                <img className={[styles.imgLogo].join(' ')} src={logoBig} />
            </Link>
            {children}
        </div>
    )
}
