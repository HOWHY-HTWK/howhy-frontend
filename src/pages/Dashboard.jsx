import React, { useEffect, useReducer, useRef, useState } from 'react'
import DashList from '../components/DashList';
import * as api from '../api';
import { useStateContext } from '../contexts/ContextProvider';
import styles from './css/Dashboard.module.css';
import TabBar from '../components/TabBar';
import SearchBar from '../components/SearchBar';

export default function Dashboard() {
    const { user, setUser } = useStateContext()
    const [score, setscore] = useState(null)
    const [page, setPage] = useState()

    const [searchterm, setSearchTerm] = useState()

    useEffect(() => {
        api.score().then(response => {
            setscore(response.data.score)
        })
    }, [])

    return (
        <div className={[styles.wrap].join(' ')} >
            <SearchBar setSearchTerm={setSearchTerm}></SearchBar>
            <TabBar setPage={setPage}></TabBar>
            <div className={[styles.page, page == 0 ? styles.active : null].join(' ')} >Home</div>
            <div className={[styles.page, page == 1 ? styles.active : null].join(' ')}>
                <DashList searchterm={searchterm}></DashList>
            </div>
            <div className={[styles.page, page == 2 ? styles.active : null].join(' ')}>Preise</div>
        </div>
    );
}
