import React, { useEffect, useRef, useState } from 'react'
import logoBig from '../assets/logo_big.png'
import { Link } from 'react-router-dom'
import styles from './css/UserHeader.module.css'
import * as api from '../api';

import profil from '../assets/icons/Profil.svg'
import { useStateContext } from '../contexts/ContextProvider'
import UserMenu from './UserMenu'
import Score from './Score'

export default function UserHeader({ children, setPage }) {
    const { user, setUser } = useStateContext()

    const [score, setscore] = useState(null)

    useEffect(() => {
        api.score().then(response => {
            setscore(response.data.score)
        })
    }, [])

    return (
        <div className={[styles.background].join(' ')} >
            <div className={[styles.topbar].join(' ')} >
                <Link to={'/'} className={[styles.home].join(' ')} >
                    <img className={[styles.imgLogo].join(' ')} src={profil} />
                    <div className={[styles.username].join(' ')} >{user.name}</div>
                </Link>
                {score != null && user ? <Score newscore={score}></Score> : null}
            </div>

        </div>
    )
}
