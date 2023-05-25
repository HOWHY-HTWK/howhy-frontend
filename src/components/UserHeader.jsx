import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import styles from './css/UserHeader.module.css'
import * as api from '../api';

import profil from '../assets/icons/Profil.svg'
import { useStateContext } from '../contexts/ContextProvider'
import Score from './Score'

export default function UserHeader({ children, setPage }) {
    const { user, setUser } = useStateContext()
    const navigate = useNavigate();

    const [score, setscore] = useState(null)

    useEffect(() => {
        api.score().then(response => {
            setscore(response.data.score)
        })
    }, [])

    return (
        <div className={[styles.background].join(' ')} >
            <div className={[styles.topbar].join(' ')} >
                {user ?
                    <Link to={'/user'} className={[styles.home].join(' ')} >
                        <img className={[styles.imgLogo].join(' ')} src={profil} />
                        <div className={[styles.username].join(' ')} >{user ? user.name : ''}</div>
                    </Link>
                    :
                    <div className={['button', styles.loginButton].join(' ')} onClick={() => navigate('/userlogin')}>Einloggen</ div>
                }
                {score != null && user ? <Score newscore={score}></Score> : null}
            </div>
        </div>
    )
}
