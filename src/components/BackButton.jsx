import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom';
import back from '../assets/icons/back.svg'
import styles from './css/BackButton.module.css'



export default function BackButton() {
    const navigate = useNavigate();

    return (
        <img className={[styles.back].join(' ')} src={back} onClick={() => navigate(-1)}></img>
    )
}
