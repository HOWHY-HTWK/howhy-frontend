import React, { useEffect, useReducer, useRef, useState } from 'react'
import DashList from '../components/DashList';
import * as api from '../api';
import styles from './css/Dashboard.module.css';
import TabBar from '../components/TabBar';
import Prizes from '../components/Prizes';
import Home from '../components/Home';

export default function Dashboard() {
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
            {/* <SearchBar setSearchTerm={setSearchTerm}></SearchBar> */}
            {/* <UserHeader ></UserHeader> */}
            <TabBar setPage={setPage}></TabBar>
            <div className={[styles.page, page == 0 ? styles.active : null].join(' ')} >
                <Home></Home>
            </div>
            <div className={[styles.page, page == 1 ? styles.active : null].join(' ')}>
                <DashList random={true}></DashList>
            </div>
            <div className={[styles.page, page == 2 ? styles.active : null].join(' ')}>
                <Prizes></Prizes>
            </div>
        </div>
    );
}
