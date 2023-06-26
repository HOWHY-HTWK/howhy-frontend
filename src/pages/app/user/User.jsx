import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './UserPage.module.css'
import back from 'src/assets/icons/back.svg'
import { Link, useNavigate } from 'react-router-dom'

/**
 * The wrapper Page for all the User Settings. It always display a Back over all Subpages.
 * @returns 
 */
export default function User() {
    const navigate = useNavigate();

    return (
        <div className={[styles.userWrap].join(' ')} >
            <img className={[styles.back].join(' ')} src={back} onClick={() => navigate(-1)}></img>
            <Outlet />
        </div>
    )
}
