import React, { useState } from 'react'
import DashList from 'src/pages/app/videolist/DashList';
import styles from './Dashboard.module.css';
import TabBar from 'src/pages/app/components/TabBar';
import Prizes from 'src/pages/app/prizes/Prizes';
import Home from 'src/pages/app/home/Home';

/**
 * The wrapper for the Tabed View on the Startpage of the User Frontend. All Pages in the Tabs 
 * are loaded and hidden according to wich Tab is selected to make the changes between Tabs quick.
 * 
 * @returns 
 */
export default function Dashboard() {
    const [page, setPage] = useState()

    return (
        <div className={[styles.wrap].join(' ')} >
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
