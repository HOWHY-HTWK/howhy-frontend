import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './css/UserPage.module.css'
import back from '../assets/icons/back.svg'
import { Link, useNavigate } from 'react-router-dom'


export default function User() {
    const navigate = useNavigate();

    return (
        <div className={[styles.userWrap].join(' ')} >
            <img className={[styles.back].join(' ')} src={back} onClick={() => navigate(-1)}></img>
            <Outlet />
        </div>
    )
}
