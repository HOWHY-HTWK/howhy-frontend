import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import styles from './css/UserHeader.module.css'
import * as api from '../api';

import profil from '../assets/icons/Profil.svg'
import { useStateContext } from '../contexts/ContextProvider'
import Score from './Score'
import back from '../assets/icons/back.svg'
import lupe from '../assets/icons/lupe.svg'

export default function UserHeader({ children, setPage }) {
    const { user, setUser } = useStateContext()
    const navigate = useNavigate()
    const location = useLocation()
    const subRoute = !(location.pathname == '/')

    return (
        <div className={['center', styles.background].join(' ')} >
            <div className={[styles.topbar].join(' ')} >
                <div className={['center', styles.leftWrap].join(' ')} >
                    {subRoute ? <img className={[styles.back].join(' ')} src={back} onClick={() => navigate(-1)}></img> : null}
                    {user ?
                        <>
                            <Link to={'/user'} className={[styles.home].join(' ')} >
                                <img className={[styles.imgLogo].join(' ')} src={profil} />
                                <div className={[styles.username].join(' ')} >{user ? user.name : ''}</div>
                            </Link>
                        </>
                        :
                        <div className={['button', 'center', styles.loginButton, styles.loginButton].join(' ')} onClick={() => navigate('/userlogin')}>Einloggen</ div>
                    }
                </div>
                <div className={['center', styles.rightWrap].join(' ')} >
                    {!subRoute ?
                        <Link className={['center'].join(' ')} to={'/search'}><img src={lupe}></img></Link>
                        : null
                    }
                    <Score ></Score>
                </div>
            </div>
        </div>
    )
}
