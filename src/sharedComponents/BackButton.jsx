import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom';
import back from 'src/assets/icons/back.svg'
import styles from './BackButton.module.css'



export default function BackButton() {
    const navigate = useNavigate();

    return (
        <img className={[styles.back].join(' ')} src={back} onClick={() => navigate(-1)}></img>
    )
}
