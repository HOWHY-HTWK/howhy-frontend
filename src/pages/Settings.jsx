import React, { useEffect, useState } from 'react'
import styles from './css/Settings.module.css'
import axiosClient from '../../axios-client';
import AddEmail from '../components/AddEmail';
import ChangeRights from '../components/ChangeRights';

export default function Settings() {
    
    useEffect(() => {
        document.title = "Einstellungen";
    }, [])

    return (
        <div className={styles.wrap}>
            <h3>Einstellungen</h3>
            <div className={styles.contentWrap}>
                <AddEmail></AddEmail>
                <ChangeRights></ChangeRights>
            </div>
        </div>
    )
}
