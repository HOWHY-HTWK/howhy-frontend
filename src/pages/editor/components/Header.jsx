import React, { useEffect, useRef, useState } from 'react'
import logoBig from 'src/assets/logo_big.png'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function Header({ children }) {
    return (
        <div className={[styles.background, styles.editorBackground].join(' ')} >
            <Link to={'/editor'} className={[styles.home].join(' ')} >
                <img className={[styles.imgLogo].join(' ')} src={logoBig} />
            </Link>
            {children}
        </div>
    )
}
