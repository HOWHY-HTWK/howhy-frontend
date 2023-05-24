import React, { useEffect, useReducer, useRef, useState } from 'react'
import DashList from '../components/DashList';
import Score from '../components/Score';
import * as api from '../api';
import { useStateContext } from '../contexts/ContextProvider';
import styles from './css/Dashboard.module.css';
import UserHeader from '../components/UserHeader';
import UserMenu from '../components/UserMenu';
import TabBar from '../components/TabBar';

export default function Dashboard() {
    const { user, setUser } = useStateContext()
    const [score, setscore] = useState(null)
    const [page, setPage] = useState()

    useEffect(() => {
        api.score().then(response => {
            setscore(response.data.score)
        })
    }, [])

    return (
        <div className={[styles.wrap].join(' ')} >
            <TabBar setPage={setPage}></TabBar>
            <div className={[styles.page, page == 0 ? styles.active : null].join(' ')} >Home</div>
            <div className={[styles.page, page == 1 ? styles.active : null].join(' ')}>
                <DashList ></DashList>
            </div>
            <div className={[styles.page, page == 2 ? styles.active : null].join(' ')}>Preise</div>
        </div>
    );
}
